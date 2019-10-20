resource "aws_api_gateway_resource" "equipment" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  parent_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  path_part   = "equipment"
}

# GET

resource "aws_api_gateway_method" "get_equipment" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.equipment.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_equipment" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.equipment.id}"
  http_method             = "${aws_api_gateway_method.get_equipment.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.get_equipment_lambda.invoke_arn}"
  passthrough_behavior    = "WHEN_NO_TEMPLATES"

  request_templates = {
    "application/json" = <<EOF
{
  "ascending": "$input.params('ascending')",
  "page": "$input.params('page')",
  "perPage": "$input.params('perPage')",
  "searchValue": "$input.params('searchValue')",
  "sortBy": "$input.params('sortBy')",
  "id": "$input.params('id')",
  "new": "$input.params('new')",
  "show": "$input.params('show')",
  "edit": "$input.params('edit')"
}
EOF
  }
}

resource "aws_api_gateway_method_response" "get_equipment_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.get_equipment.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = ["aws_api_gateway_method.get_equipment"]
}

resource "aws_api_gateway_integration_response" "get_equipment_ok" {
  depends_on = ["aws_api_gateway_integration.get_equipment"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.get_equipment.http_method}"
  status_code = "${aws_api_gateway_method_response.get_equipment_ok.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_lambda_permission" "get_equipment_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_equipment_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.get_equipment.http_method}${aws_api_gateway_resource.equipment.path}"
}

# PATCH

resource "aws_api_gateway_method" "patch_equipment" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.equipment.id}"
  http_method   = "PATCH"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_equipment" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.equipment.id}"
  http_method             = "${aws_api_gateway_method.patch_equipment.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.patch_equipment_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "patch_equipment_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.patch_equipment.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "patch_equipment_ok" {
  depends_on = ["aws_api_gateway_integration.patch_equipment"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.patch_equipment.http_method}"
  status_code = "${aws_api_gateway_method_response.patch_equipment_ok.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_lambda_permission" "patch_equipment_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.patch_equipment_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.patch_equipment.http_method}${aws_api_gateway_resource.equipment.path}"
}

# POST

resource "aws_api_gateway_method" "post_equipment" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.equipment.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_equipment" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.equipment.id}"
  http_method             = "${aws_api_gateway_method.post_equipment.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.post_equipment_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "post_equipment_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.post_equipment.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "post_equipment_ok" {
  depends_on = ["aws_api_gateway_integration.post_equipment"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.post_equipment.http_method}"
  status_code = "${aws_api_gateway_method_response.post_equipment_ok.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_lambda_permission" "post_equipment_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.post_equipment_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.post_equipment.http_method}${aws_api_gateway_resource.equipment.path}"
}

# DELETE

resource "aws_api_gateway_method" "delete_equipment" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.equipment.id}"
  http_method   = "DELETE"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_equipment" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.equipment.id}"
  http_method             = "${aws_api_gateway_method.delete_equipment.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.delete_equipment_lambda.invoke_arn}"
  passthrough_behavior    = "WHEN_NO_TEMPLATES"

  request_templates = {
    "application/json" = <<EOF
{
  "id": "$input.params('id')"
}
EOF
  }
}

resource "aws_api_gateway_method_response" "delete_equipment_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.delete_equipment.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "delete_equipment_ok" {
  depends_on = ["aws_api_gateway_integration.delete_equipment"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.equipment.id}"
  http_method = "${aws_api_gateway_method.delete_equipment.http_method}"
  status_code = "${aws_api_gateway_method_response.delete_equipment_ok.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_lambda_permission" "delete_equipment_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.delete_equipment_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.delete_equipment.http_method}${aws_api_gateway_resource.equipment.path}"
}

# OPTIONS

resource "aws_api_gateway_method" "options_equipment" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.equipment.id}"
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_equipment" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.equipment.id}"
    http_method   = "${aws_api_gateway_method.options_equipment.http_method}"
    type          = "MOCK"
    depends_on = ["aws_api_gateway_method.options_equipment"]
}

resource "aws_api_gateway_method_response" "options_equipment_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.equipment.id}"
    http_method   = "${aws_api_gateway_method.options_equipment.http_method}"
    status_code   = "200"

    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
    response_models = {
        "application/json" = "Empty"
    }
    depends_on = ["aws_api_gateway_method.options_equipment"]
}

resource "aws_api_gateway_integration_response" "options_equipment_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.equipment.id}"
    http_method   = "${aws_api_gateway_method.options_equipment.http_method}"
    status_code   = "${aws_api_gateway_method_response.options_equipment_ok.status_code}"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'DELETE,GET,OPTIONS,PATCH,POST'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
    depends_on = ["aws_api_gateway_method_response.options_equipment_ok"]
}
