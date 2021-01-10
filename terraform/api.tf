resource aws_api_gateway_rest_api "api_gateway_rest_api" {
  name = "Transient Specialists"
}

resource aws_api_gateway_deployment "api_gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  stage_name  = "default"
}

resource aws_api_gateway_api_key "api_gateway_amplify_api_key" {
  name = "Amplify"
}

resource aws_api_gateway_usage_plan "api_gateway_amplify_usage_plan" {
  name = "Amplify"

  api_stages {
    api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
    stage  = aws_api_gateway_deployment.api_gateway_deployment.stage_name
  }
}

resource aws_api_gateway_usage_plan_key "api_gateway_amplify_usage_plan_key" {
  key_id        = aws_api_gateway_api_key.api_gateway_amplify_api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.api_gateway_amplify_usage_plan.id
}

module "api_gateway_equipment" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "equipment"
  delete_lambda_invoke_arn    = module.delete_equipment_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_equipment_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_equipment_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_equipment_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_equipment_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_equipment_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_equipment_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_equipment_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

module "api_gateway_models" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "models"
  delete_lambda_invoke_arn    = module.delete_models_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_models_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_models_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_models_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_models_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_models_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_models_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_models_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

module "api_gateway_oems" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "oems"
  delete_lambda_invoke_arn    = module.delete_oems_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_oems_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_oems_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_oems_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_oems_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_oems_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_oems_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_oems_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

module "api_gateway_types" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "types"
  delete_lambda_invoke_arn    = module.delete_types_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_types_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_types_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_types_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_types_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_types_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_types_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_types_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

module "api_gateway_events" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "events"
  delete_lambda_invoke_arn    = module.delete_events_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_events_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_events_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_events_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_events_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_events_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_events_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_events_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

module "api_gateway_itemgroups" {
  source = "./api_gateway"

  rest_api_id                 = aws_api_gateway_rest_api.api_gateway_rest_api.id
  rest_api_root_resource_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  resource_path               = "itemgroups"
  delete_lambda_invoke_arn    = module.delete_itemgroups_lambda.lambda_invoke_arn
  delete_lambda_function_name = module.delete_itemgroups_lambda.lambda_function_name
  get_lambda_invoke_arn       = module.get_itemgroups_lambda.lambda_invoke_arn
  get_lambda_function_name    = module.get_itemgroups_lambda.lambda_function_name
  patch_lambda_invoke_arn     = module.patch_itemgroups_lambda.lambda_invoke_arn
  patch_lambda_function_name  = module.patch_itemgroups_lambda.lambda_function_name
  post_lambda_invoke_arn      = module.post_itemgroups_lambda.lambda_invoke_arn
  post_lambda_function_name   = module.post_itemgroups_lambda.lambda_function_name
  origin                      = var.origin
  region                      = var.region
  account_id                  = var.account_id
}

resource aws_api_gateway_resource "reports_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "reports"
}

module "reports_get_method" {
  source = "./api_gateway/api_gateway_mapped_method"

  rest_api_id          = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id          = aws_api_gateway_resource.reports_resource.id
  resource_path        = aws_api_gateway_resource.reports_resource.path
  http_method          = "GET"
  lambda_invoke_arn    = module.generate_reports_lambda.lambda_invoke_arn
  lambda_function_name = module.generate_reports_lambda.lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "reports_options_method" {
  source = "./api_gateway/api_gateway_options_method"

  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id = aws_api_gateway_resource.reports_resource.id
  origin      = var.origin
}

resource aws_api_gateway_resource "files_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.api_gateway_rest_api.root_resource_id
  path_part   = "files"
}

module "files_post_method" {
  source = "./api_gateway/api_gateway_method"

  rest_api_id          = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id          = aws_api_gateway_resource.files_resource.id
  resource_path        = aws_api_gateway_resource.files_resource.path
  http_method          = "POST"
  lambda_invoke_arn    = module.post_files_lambda.lambda_invoke_arn
  lambda_function_name = module.post_files_lambda.lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "files_delete_method" {
  source = "./api_gateway/api_gateway_mapped_method"

  rest_api_id          = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id          = aws_api_gateway_resource.files_resource.id
  resource_path        = aws_api_gateway_resource.files_resource.path
  http_method          = "DELETE"
  lambda_invoke_arn    = module.delete_files_lambda.lambda_invoke_arn
  lambda_function_name = module.delete_files_lambda.lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "files_get_method" {
  source = "./api_gateway/api_gateway_mapped_method"

  rest_api_id          = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id          = aws_api_gateway_resource.files_resource.id
  resource_path        = aws_api_gateway_resource.files_resource.path
  http_method          = "GET"
  lambda_invoke_arn    = module.get_files_lambda.lambda_invoke_arn
  lambda_function_name = module.get_files_lambda.lambda_function_name
  origin               = var.origin
  region               = var.region
  account_id           = var.account_id
}

module "files_options_method" {
  source = "./api_gateway/api_gateway_options_method"

  rest_api_id = aws_api_gateway_rest_api.api_gateway_rest_api.id
  resource_id = aws_api_gateway_resource.files_resource.id
  origin      = var.origin
}
