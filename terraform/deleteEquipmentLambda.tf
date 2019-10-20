resource "aws_lambda_function" "delete_equipment_lambda" {
  function_name = "deleteEquipment"

  filename         = "${data.archive_file.zip.output_path}"
  source_code_hash = "${data.archive_file.zip.output_base64sha256}"

  role    = "${aws_iam_role.iam_for_lambda.arn}"
  handler = "handlers/deleteEquipment.handler"
  runtime = "nodejs10.x"

  environment {
    variables = {
      DB_ENDPOINT            = "${aws_db_instance.transient_specialists_dev.address}"
      DB_MASTER_USERNAME     = "${var.DB_MASTER_USERNAME}"
      DB_MASTER_PASSWORD     = "${var.DB_MASTER_PASSWORD}"
      DB_NAME                = "${var.DB_NAME}"
    }
  }

  depends_on = ["aws_iam_role_policy_attachment.lambda_logs", "aws_cloudwatch_log_group.delete_equipment_lambda_logs"]
}

resource "aws_cloudwatch_log_group" "delete_equipment_lambda_logs" {
  name              = "/aws/lambda/deleteEquipment"
  retention_in_days = 3
}
