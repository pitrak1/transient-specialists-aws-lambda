provider "aws" {
  profile = "default"
  region  = "${var.region}"
}
module "main" {
  source             = "./terraform"
  db_master_username = "${var.db_master_username}"
  db_master_password = "${var.db_master_password}"
  db_name            = "${var.db_name}"
  account_id         = "${var.account_id}"
  region             = "${var.region}"
  origin             = "${var.origin}"
}

variable "db_master_username" {
  type = "string"
}

variable "db_master_password" {
  type = "string"
}

variable "db_name" {
  type = "string"
}

variable "account_id" {
  type = "string"
}

variable "region" {
  type = "string"
}

variable "origin" {
  type = "string"
}
