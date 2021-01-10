resource aws_api_gateway_resource "api_gateway_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_root_resource_id
  path_part   = var.resource_path
}

module "delete_resource" {
  source = "./api_gateway_mapped_method"

  rest_api_id          = var.rest_api_id
  resource_id          = aws_api_gateway_resource.api_gateway_resource.id
  resource_path        = aws_api_gateway_resource.api_gateway_resource.path
  http_method          = "DELETE"
  lambda_invoke_arn    = var.delete_lambda_invoke_arn
  lambda_function_name = var.delete_lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "get_resource" {
  source = "./api_gateway_mapped_method"

  rest_api_id          = var.rest_api_id
  resource_id          = aws_api_gateway_resource.api_gateway_resource.id
  resource_path        = aws_api_gateway_resource.api_gateway_resource.path
  http_method          = "GET"
  lambda_invoke_arn    = var.get_lambda_invoke_arn
  lambda_function_name = var.get_lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "patch_resource" {
  source = "./api_gateway_method"

  rest_api_id          = var.rest_api_id
  resource_id          = aws_api_gateway_resource.api_gateway_resource.id
  resource_path        = aws_api_gateway_resource.api_gateway_resource.path
  http_method          = "PATCH"
  lambda_invoke_arn    = var.patch_lambda_invoke_arn
  lambda_function_name = var.patch_lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "post_resource" {
  source = "./api_gateway_method"

  rest_api_id          = var.rest_api_id
  resource_id          = aws_api_gateway_resource.api_gateway_resource.id
  resource_path        = aws_api_gateway_resource.api_gateway_resource.path
  http_method          = "POST"
  lambda_invoke_arn    = var.post_lambda_invoke_arn
  lambda_function_name = var.post_lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "options_resource" {
  source = "./api_gateway_options_method"

  rest_api_id = var.rest_api_id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  origin      = var.origin
}
