provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "src"
  output_path = "lambda.zip"
}

resource "aws_iam_policy" "iam_policy" {
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

data "aws_iam_policy_document" "iam_policy_document" {
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

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment" {
  role       = "${aws_iam_role.iam_role.name}"
  policy_arn = "${aws_iam_policy.iam_policy.arn}"
}

resource "aws_iam_role" "iam_role" {
  name               = "lambda_iam_role"
  assume_role_policy = "${data.aws_iam_policy_document.iam_policy_document.json}"
}

module "rds" {
  source = "./rds"

  db_name            = "${var.db_name}"
  db_identifier      = "transient-specialists"
  db_master_username = "${var.db_master_username}"
  db_master_password = "${var.db_master_password}"
}
