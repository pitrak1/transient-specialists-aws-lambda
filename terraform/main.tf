provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "src"
  output_path = "lambda.zip"
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging"
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

data "aws_iam_policy_document" "policy" {
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

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = "${aws_iam_role.iam_for_lambda.name}"
  policy_arn = "${aws_iam_policy.lambda_logging.arn}"
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = "${data.aws_iam_policy_document.policy.json}"
}

resource "aws_api_gateway_rest_api" "transient_specialists" {
  name = "Transient Specialists"
}

resource "aws_api_gateway_deployment" "transient_specialists_deployment" {
  depends_on  = [
    "aws_api_gateway_integration.get_equipment",
    "aws_api_gateway_integration.patch_equipment",
    "aws_api_gateway_integration.post_equipment",
    "aws_api_gateway_integration.delete_equipment",
    "aws_api_gateway_integration.options_equipment",
    "aws_api_gateway_integration.get_events",
    "aws_api_gateway_integration.patch_events",
    "aws_api_gateway_integration.post_events",
    "aws_api_gateway_integration.delete_events",
    "aws_api_gateway_integration.options_events",
    "aws_api_gateway_integration.get_models",
    "aws_api_gateway_integration.patch_models",
    "aws_api_gateway_integration.post_models",
    "aws_api_gateway_integration.delete_models",
    "aws_api_gateway_integration.options_models",
    "aws_api_gateway_integration.get_oems",
    "aws_api_gateway_integration.patch_oems",
    "aws_api_gateway_integration.post_oems",
    "aws_api_gateway_integration.delete_oems",
    "aws_api_gateway_integration.options_oems",
    "aws_api_gateway_integration.get_types",
    "aws_api_gateway_integration.patch_types",
    "aws_api_gateway_integration.post_types",
    "aws_api_gateway_integration.delete_types",
    "aws_api_gateway_integration.options_types",
  ]
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  stage_name  = "default"
}