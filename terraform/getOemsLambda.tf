resource "aws_lambda_function" "get_oems_lambda" {
  function_name = "getOems"

  filename         = "${data.archive_file.zip.output_path}"
  source_code_hash = "${data.archive_file.zip.output_base64sha256}"

  role    = "${aws_iam_role.iam_for_lambda.arn}"
  handler = "handlers/getOems.handler"
  runtime = "nodejs10.x"

  environment {
    variables = {
      DB_ENDPOINT            = "${module.rds_dev.db_instance_address}"
      DB_MASTER_USERNAME     = "${var.DB_MASTER_USERNAME}"
      DB_MASTER_PASSWORD     = "${var.DB_MASTER_PASSWORD}"
      DB_NAME                = "${var.DB_NAME}"
    }
  }

  depends_on = ["aws_iam_role_policy_attachment.lambda_logs", "aws_cloudwatch_log_group.get_oems_lambda_logs"]
}

resource "aws_cloudwatch_log_group" "get_oems_lambda_logs" {
  name              = "/aws/lambda/getOems"
  retention_in_days = 3
}
