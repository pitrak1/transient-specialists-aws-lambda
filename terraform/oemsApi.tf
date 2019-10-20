resource "aws_api_gateway_resource" "oems" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  parent_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  path_part   = "oems"
}

# GET

resource "aws_api_gateway_method" "get_oems" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.oems.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_oems" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.oems.id}"
  http_method             = "${aws_api_gateway_method.get_oems.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.get_oems_lambda.invoke_arn}"
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

resource "aws_api_gateway_method_response" "get_oems_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.get_oems.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Timestamp"      = true
    "method.response.header.Content-Length" = true
    "method.response.header.Content-Type"   = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "get_oems_ok" {
  depends_on = ["aws_api_gateway_integration.get_oems"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.get_oems.http_method}"
  status_code = "${aws_api_gateway_method_response.get_oems_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "get_oems_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_oems_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.get_oems.http_method}${aws_api_gateway_resource.oems.path}"
}

# PATCH

resource "aws_api_gateway_method" "patch_oems" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.oems.id}"
  http_method   = "PATCH"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_oems" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.oems.id}"
  http_method             = "${aws_api_gateway_method.patch_oems.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.patch_oems_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "patch_oems_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.patch_oems.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Timestamp"      = true
    "method.response.header.Content-Length" = true
    "method.response.header.Content-Type"   = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "patch_oems_ok" {
  depends_on = ["aws_api_gateway_integration.patch_oems"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.patch_oems.http_method}"
  status_code = "${aws_api_gateway_method_response.patch_oems_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "patch_oems_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.patch_oems_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.patch_oems.http_method}${aws_api_gateway_resource.oems.path}"
}

# POST

resource "aws_api_gateway_method" "post_oems" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.oems.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_oems" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.oems.id}"
  http_method             = "${aws_api_gateway_method.post_oems.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.post_oems_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "post_oems_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.post_oems.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Timestamp"      = true
    "method.response.header.Content-Length" = true
    "method.response.header.Content-Type"   = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "post_oems_ok" {
  depends_on = ["aws_api_gateway_integration.post_oems"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.post_oems.http_method}"
  status_code = "${aws_api_gateway_method_response.post_oems_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "post_oems_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.post_oems_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.post_oems.http_method}${aws_api_gateway_resource.oems.path}"
}

# DELETE

resource "aws_api_gateway_method" "delete_oems" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.oems.id}"
  http_method   = "DELETE"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_oems" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.oems.id}"
  http_method             = "${aws_api_gateway_method.delete_oems.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.delete_oems_lambda.invoke_arn}"
  passthrough_behavior    = "WHEN_NO_TEMPLATES"

  request_templates = {
    "application/json" = <<EOF
{
  "id": "$input.params('id')"
}
EOF
  }
}

resource "aws_api_gateway_method_response" "delete_oems_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.delete_oems.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Timestamp"      = true
    "method.response.header.Content-Length" = true
    "method.response.header.Content-Type"   = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "delete_oems_ok" {
  depends_on = ["aws_api_gateway_integration.delete_oems"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.oems.id}"
  http_method = "${aws_api_gateway_method.delete_oems.http_method}"
  status_code = "${aws_api_gateway_method_response.delete_oems_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "delete_oems_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.delete_oems_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.delete_oems.http_method}${aws_api_gateway_resource.oems.path}"
}

# OPTIONS

resource "aws_api_gateway_method" "options_oems" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.oems.id}"
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_oems" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.oems.id}"
    http_method   = "${aws_api_gateway_method.options_oems.http_method}"
    type          = "MOCK"
    depends_on = ["aws_api_gateway_method.options_oems"]
}

resource "aws_api_gateway_method_response" "options_oems_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.oems.id}"
    http_method   = "${aws_api_gateway_method.options_oems.http_method}"
    status_code   = "200"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
    response_models = {
        "application/json" = "Empty"
    }
    depends_on = ["aws_api_gateway_method.options_oems"]
}

resource "aws_api_gateway_integration_response" "options_oems_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.oems.id}"
    http_method   = "${aws_api_gateway_method.options_oems.http_method}"
    status_code   = "${aws_api_gateway_method_response.options_oems_ok.status_code}"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
    depends_on = ["aws_api_gateway_method_response.options_oems_ok"]
}
