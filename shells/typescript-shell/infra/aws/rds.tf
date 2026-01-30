# AWS RDS PostgreSQL Configuration

# Random password for database
resource "random_password" "db" {
  length  = 32
  special = false
}

# Security Group for RDS
resource "aws_security_group" "db" {
  name        = "${local.name_prefix}-db-sg"
  description = "Allow PostgreSQL traffic from ECS tasks"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "PostgreSQL from ECS"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${local.name_prefix}-db-subnet"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name = "${local.name_prefix}-db-subnet"
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier = "${local.name_prefix}-db"

  # Engine
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = var.db_instance_class

  # Storage
  allocated_storage     = 20
  max_allocated_storage = local.is_prod ? 100 : 50
  storage_type          = "gp3"
  storage_encrypted     = true

  # Database
  db_name  = replace(var.app_name, "-", "_")
  username = "postgres"
  password = random_password.db.result

  # Network
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  publicly_accessible    = false

  # Backup & Maintenance
  backup_retention_period   = local.is_prod ? 7 : 1
  backup_window             = "03:00-04:00"
  maintenance_window        = "Mon:04:00-Mon:05:00"
  auto_minor_version_upgrade = true

  # Protection
  skip_final_snapshot = !local.is_prod
  deletion_protection = local.is_prod

  # Performance Insights (production only)
  performance_insights_enabled          = local.is_prod
  performance_insights_retention_period = local.is_prod ? 7 : 0

  tags = {
    Name = "${local.name_prefix}-db"
  }
}

# Store credentials in Secrets Manager
resource "aws_secretsmanager_secret" "db" {
  name                    = "${local.name_prefix}-db-credentials"
  recovery_window_in_days = local.is_prod ? 30 : 0
}

resource "aws_secretsmanager_secret_version" "db" {
  secret_id = aws_secretsmanager_secret.db.id
  secret_string = jsonencode({
    username     = aws_db_instance.main.username
    password     = random_password.db.result
    host         = aws_db_instance.main.address
    port         = aws_db_instance.main.port
    database     = aws_db_instance.main.db_name
    database_url = "postgresql://${aws_db_instance.main.username}:${random_password.db.result}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}"
  })
}
