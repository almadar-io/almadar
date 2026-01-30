# KFlow V3 Generated Infrastructure
# Main Terraform Configuration

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  # Uncomment for remote state (recommended for teams)
  # backend "s3" {
  #   bucket         = "{{APP_NAME}}-terraform-state"
  #   key            = "terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "{{APP_NAME}}-terraform-lock"
  # }
}

# Use AWS module by default
module "aws" {
  source      = "./aws"
  app_name    = var.app_name
  environment = var.environment
  region      = var.region
  
  # Optional: customize resources
  db_instance_class    = var.db_instance_class
  ecs_cpu              = var.ecs_cpu
  ecs_memory           = var.ecs_memory
  desired_count        = var.desired_count
}

# Outputs
output "client_url" {
  description = "Frontend URL"
  value       = module.aws.client_url
}

output "api_url" {
  description = "Backend API URL"
  value       = module.aws.api_url
}

output "database_url" {
  description = "Database connection string"
  value       = module.aws.database_url
  sensitive   = true
}

output "ecr_client_url" {
  description = "ECR repository URL for client"
  value       = module.aws.ecr_client_url
}

output "ecr_server_url" {
  description = "ECR repository URL for server"
  value       = module.aws.ecr_server_url
}
