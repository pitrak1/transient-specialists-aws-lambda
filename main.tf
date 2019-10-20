provider "aws" {
  profile = "default"
  region  = "${var.REGION}"
}
module "main" {
  source                 = "./terraform"
  DB_MASTER_USERNAME     = "${var.DB_MASTER_USERNAME}"
  DB_MASTER_PASSWORD     = "${var.DB_MASTER_PASSWORD}"
  DB_NAME                = "${var.DB_NAME}"
  ACCOUNT_ID             = "${var.ACCOUNT_ID}"
  REGION                 = "${var.REGION}"
}

variable "DB_MASTER_USERNAME" {
  type = "string"
}

variable "DB_MASTER_PASSWORD" {
  type = "string"
}

variable "DB_NAME" {
  type = "string"
}

variable "ACCOUNT_ID" {
  type = "string"
}

variable "REGION" {
  type = "string"
}