# AWS Infrastructure Module

variable "app_name" {}
variable "environment" {}
variable "region" {}
variable "db_instance_class" { default = "db.t3.micro" }
variable "ecs_cpu" { default = 256 }
variable "ecs_memory" { default = 512 }
variable "desired_count" { default = 1 }

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Application = var.app_name
      Environment = var.environment
      ManagedBy   = "terraform"
      GeneratedBy = "kflow-v3"
    }
  }
}

locals {
  name_prefix = "${var.app_name}-${var.environment}"
  is_prod     = var.environment == "production"
}

# VPC
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${local.name_prefix}-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = !local.is_prod
  enable_dns_hostnames = true
  enable_dns_support   = true
}

# ECR Repositories
resource "aws_ecr_repository" "client" {
  name                 = "${var.app_name}-client"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_ecr_repository" "server" {
  name                 = "${var.app_name}-server"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  lifecycle {
    prevent_destroy = false
  }
}

# ECR Lifecycle Policy (clean up old images)
resource "aws_ecr_lifecycle_policy" "client" {
  repository = aws_ecr_repository.client.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}

resource "aws_ecr_lifecycle_policy" "server" {
  repository = aws_ecr_repository.server.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${local.name_prefix}-cluster"

  setting {
    name  = "containerInsights"
    value = local.is_prod ? "enabled" : "disabled"
  }
}

# Outputs
output "client_url" {
  value = "https://${aws_cloudfront_distribution.client.domain_name}"
}

output "api_url" {
  value = "http://${aws_lb.api.dns_name}"
}

output "database_url" {
  value     = "postgresql://${aws_db_instance.main.username}:${random_password.db.result}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}"
  sensitive = true
}

output "ecr_client_url" {
  value = aws_ecr_repository.client.repository_url
}

output "ecr_server_url" {
  value = aws_ecr_repository.server.repository_url
}
