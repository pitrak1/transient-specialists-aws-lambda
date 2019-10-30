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
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  stage_name  = "default"
}

module "api_gateway_equipment_dev" {
  source = "./api_gateway"

  rest_api_id                 = "${aws_api_gateway_rest_api.transient_specialists.id}"
  rest_api_root_resource_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  resource_path               = "equipment"
  delete_lambda_invoke_arn    = "${module.delete_equipment_lambda.lambda_invoke_arn}"
  delete_lambda_function_name = "${module.delete_equipment_lambda.lambda_function_name}"
  get_lambda_invoke_arn       = "${module.get_equipment_lambda.lambda_invoke_arn}"
  get_lambda_function_name    = "${module.get_equipment_lambda.lambda_function_name}"
  patch_lambda_invoke_arn     = "${module.patch_equipment_lambda.lambda_invoke_arn}"
  patch_lambda_function_name  = "${module.patch_equipment_lambda.lambda_function_name}"
  post_lambda_invoke_arn      = "${module.post_equipment_lambda.lambda_invoke_arn}"
  post_lambda_function_name   = "${module.post_equipment_lambda.lambda_function_name}"
  origin                      = "${var.origin}"
  region                      = "${var.region}"
  account_id                  = "${var.account_id}"
}

module "api_gateway_models_dev" {
  source = "./api_gateway"

  rest_api_id                 = "${aws_api_gateway_rest_api.transient_specialists.id}"
  rest_api_root_resource_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  resource_path               = "models"
  delete_lambda_invoke_arn    = "${module.delete_models_lambda.lambda_invoke_arn}"
  delete_lambda_function_name = "${module.delete_models_lambda.lambda_function_name}"
  get_lambda_invoke_arn       = "${module.get_models_lambda.lambda_invoke_arn}"
  get_lambda_function_name    = "${module.get_models_lambda.lambda_function_name}"
  patch_lambda_invoke_arn     = "${module.patch_models_lambda.lambda_invoke_arn}"
  patch_lambda_function_name  = "${module.patch_models_lambda.lambda_function_name}"
  post_lambda_invoke_arn      = "${module.post_models_lambda.lambda_invoke_arn}"
  post_lambda_function_name   = "${module.post_models_lambda.lambda_function_name}"
  origin                      = "${var.origin}"
  region                      = "${var.region}"
  account_id                  = "${var.account_id}"
}

module "api_gateway_oems_dev" {
  source = "./api_gateway"

  rest_api_id                 = "${aws_api_gateway_rest_api.transient_specialists.id}"
  rest_api_root_resource_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  resource_path               = "oems"
  delete_lambda_invoke_arn    = "${module.delete_oems_lambda.lambda_invoke_arn}"
  delete_lambda_function_name = "${module.delete_oems_lambda.lambda_function_name}"
  get_lambda_invoke_arn       = "${module.get_oems_lambda.lambda_invoke_arn}"
  get_lambda_function_name    = "${module.get_oems_lambda.lambda_function_name}"
  patch_lambda_invoke_arn     = "${module.patch_oems_lambda.lambda_invoke_arn}"
  patch_lambda_function_name  = "${module.patch_oems_lambda.lambda_function_name}"
  post_lambda_invoke_arn      = "${module.post_oems_lambda.lambda_invoke_arn}"
  post_lambda_function_name   = "${module.post_oems_lambda.lambda_function_name}"
  origin                      = "${var.origin}"
  region                      = "${var.region}"
  account_id                  = "${var.account_id}"
}

module "api_gateway_types_dev" {
  source = "./api_gateway"

  rest_api_id                 = "${aws_api_gateway_rest_api.transient_specialists.id}"
  rest_api_root_resource_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  resource_path               = "types"
  delete_lambda_invoke_arn    = "${module.delete_types_lambda.lambda_invoke_arn}"
  delete_lambda_function_name = "${module.delete_types_lambda.lambda_function_name}"
  get_lambda_invoke_arn       = "${module.get_types_lambda.lambda_invoke_arn}"
  get_lambda_function_name    = "${module.get_types_lambda.lambda_function_name}"
  patch_lambda_invoke_arn     = "${module.patch_types_lambda.lambda_invoke_arn}"
  patch_lambda_function_name  = "${module.patch_types_lambda.lambda_function_name}"
  post_lambda_invoke_arn      = "${module.post_types_lambda.lambda_invoke_arn}"
  post_lambda_function_name   = "${module.post_types_lambda.lambda_function_name}"
  origin                      = "${var.origin}"
  region                      = "${var.region}"
  account_id                  = "${var.account_id}"
}

module "api_gateway_events_dev" {
  source = "./api_gateway"

  rest_api_id                 = "${aws_api_gateway_rest_api.transient_specialists.id}"
  rest_api_root_resource_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  resource_path               = "events"
  delete_lambda_invoke_arn    = "${module.delete_events_lambda.lambda_invoke_arn}"
  delete_lambda_function_name = "${module.delete_events_lambda.lambda_function_name}"
  get_lambda_invoke_arn       = "${module.get_events_lambda.lambda_invoke_arn}"
  get_lambda_function_name    = "${module.get_events_lambda.lambda_function_name}"
  patch_lambda_invoke_arn     = "${module.patch_events_lambda.lambda_invoke_arn}"
  patch_lambda_function_name  = "${module.patch_events_lambda.lambda_function_name}"
  post_lambda_invoke_arn      = "${module.post_events_lambda.lambda_invoke_arn}"
  post_lambda_function_name   = "${module.post_events_lambda.lambda_function_name}"
  origin                      = "${var.origin}"
  region                      = "${var.region}"
  account_id                  = "${var.account_id}"
}


module "rds_dev" {
  source = "./rds"

  db_name            = "${var.db_name}"
  db_identifier      = "transient-specialists-dev"
  db_master_username = "${var.db_master_username}"
  db_master_password = "${var.db_master_password}"
}
