provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "src"
  output_path = "lambda.zip"
}

resource "aws_lambda_function" "lambda_function" {
  function_name = "${var.function_name}"

  filename         = "${data.archive_file.zip.output_path}"
  source_code_hash = "${data.archive_file.zip.output_base64sha256}"

  role    = "${aws_iam_role.lambda_iam_role.arn}"
  handler = "${var.handler}"
  runtime = "nodejs10.x"

  environment {
    variables = {
      DB_ENDPOINT        = "${var.db_instance_address}"
      DB_MASTER_USERNAME = "${var.db_master_username}"
      DB_MASTER_PASSWORD = "${var.db_master_password}"
      DB_NAME            = "${var.db_name}"
    }
  }

  depends_on = ["aws_iam_role_policy_attachment.lambda_role_policy_attachment", "aws_cloudwatch_log_group.lambda_log_group"]
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "${var.lambda_log_group_name}"
  retention_in_days = 3
}


resource "aws_iam_policy" "lambda_policy" {
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "lambda_policy_document" {
  statement {
    sid    = ""
    effect = "Allow"

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy_attachment" {
  role       = "${aws_iam_role.lambda_iam_role.name}"
  policy_arn = "${aws_iam_policy.lambda_policy.arn}"
}

resource "aws_iam_role" "lambda_iam_role" {
  assume_role_policy = "${data.aws_iam_policy_document.lambda_policy_document.json}"
}
