provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "src"
  output_path = "lambda.zip"
}

module "rds" {
  source = "./rds"

  db_name            = "${var.db_name}"
  db_identifier      = "transient-specialists"
  db_master_username = "${var.db_master_username}"
  db_master_password = "${var.db_master_password}"
}
