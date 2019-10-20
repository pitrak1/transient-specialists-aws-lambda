resource "aws_api_gateway_resource" "events" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  parent_id   = "${aws_api_gateway_rest_api.transient_specialists.root_resource_id}"
  path_part   = "events"
}

# GET

resource "aws_api_gateway_method" "get_events" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.events.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_events" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.events.id}"
  http_method             = "${aws_api_gateway_method.get_events.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.get_events_lambda.invoke_arn}"
  passthrough_behavior    = "WHEN_NO_TEMPLATES"

  request_templates = {
    "application/json" = <<EOF
{
  "id": "$input.params('id')"
}
EOF
  }
}

resource "aws_api_gateway_method_response" "get_events_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.get_events.http_method}"
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

resource "aws_api_gateway_integration_response" "get_events_ok" {
  depends_on = ["aws_api_gateway_integration.get_events"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.get_events.http_method}"
  status_code = "${aws_api_gateway_method_response.get_events_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "get_events_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_events_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.get_events.http_method}${aws_api_gateway_resource.events.path}"
}

# PATCH

resource "aws_api_gateway_method" "patch_events" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.events.id}"
  http_method   = "PATCH"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "patch_events" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.events.id}"
  http_method             = "${aws_api_gateway_method.patch_events.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.patch_events_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "patch_events_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.patch_events.http_method}"
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

resource "aws_api_gateway_integration_response" "patch_events_ok" {
  depends_on = ["aws_api_gateway_integration.patch_events"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.patch_events.http_method}"
  status_code = "${aws_api_gateway_method_response.patch_events_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "patch_events_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.patch_events_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.patch_events.http_method}${aws_api_gateway_resource.events.path}"
}

# POST

resource "aws_api_gateway_method" "post_events" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.events.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "post_events" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.events.id}"
  http_method             = "${aws_api_gateway_method.post_events.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.post_events_lambda.invoke_arn}"
}

resource "aws_api_gateway_method_response" "post_events_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.post_events.http_method}"
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

resource "aws_api_gateway_integration_response" "post_events_ok" {
  depends_on = ["aws_api_gateway_integration.post_events"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.post_events.http_method}"
  status_code = "${aws_api_gateway_method_response.post_events_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "post_events_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.post_events_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.post_events.http_method}${aws_api_gateway_resource.events.path}"
}

# DELETE

resource "aws_api_gateway_method" "delete_events" {
  rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id   = "${aws_api_gateway_resource.events.id}"
  http_method   = "DELETE"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_events" {
  rest_api_id             = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id             = "${aws_api_gateway_resource.events.id}"
  http_method             = "${aws_api_gateway_method.delete_events.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${aws_lambda_function.delete_events_lambda.invoke_arn}"
  passthrough_behavior    = "WHEN_NO_TEMPLATES"

  request_templates = {
    "application/json" = <<EOF
{
  "id": "$input.params('id')"
}
EOF
  }
}

resource "aws_api_gateway_method_response" "delete_events_ok" {
  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.delete_events.http_method}"
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

resource "aws_api_gateway_integration_response" "delete_events_ok" {
  depends_on = ["aws_api_gateway_integration.delete_events"]

  rest_api_id = "${aws_api_gateway_rest_api.transient_specialists.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.delete_events.http_method}"
  status_code = "${aws_api_gateway_method_response.delete_events_ok.status_code}"

  response_parameters = {
    "method.response.header.Timestamp"      = "integration.response.header.Date"
    "method.response.header.Content-Length" = "integration.response.header.Content-Length"
    "method.response.header.Content-Type"   = "integration.response.header.Content-Type"
  }
}

resource "aws_lambda_permission" "delete_events_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.delete_events_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT_ID}:${aws_api_gateway_rest_api.transient_specialists.id}/*/${aws_api_gateway_method.delete_events.http_method}${aws_api_gateway_resource.events.path}"
}

# OPTIONS

resource "aws_api_gateway_method" "options_events" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.events.id}"
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_events" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.events.id}"
    http_method   = "${aws_api_gateway_method.options_events.http_method}"
    type          = "MOCK"
    depends_on = ["aws_api_gateway_method.options_events"]
}

resource "aws_api_gateway_method_response" "options_events_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.events.id}"
    http_method   = "${aws_api_gateway_method.options_events.http_method}"
    status_code   = "200"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
    response_models = {
        "application/json" = "Empty"
    }
    depends_on = ["aws_api_gateway_method.options_events"]
}

resource "aws_api_gateway_integration_response" "options_events_ok" {
    rest_api_id   = "${aws_api_gateway_rest_api.transient_specialists.id}"
    resource_id   = "${aws_api_gateway_resource.events.id}"
    http_method   = "${aws_api_gateway_method.options_events.http_method}"
    status_code   = "${aws_api_gateway_method_response.options_events_ok.status_code}"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
    depends_on = ["aws_api_gateway_method_response.options_events_ok"]
}
