
resource aws_api_gateway_method "api_gateway_method" {
  rest_api_id      = var.rest_api_id
  resource_id      = var.resource_id
  http_method      = var.http_method
  authorization    = "NONE"
  api_key_required = true
}

resource aws_api_gateway_integration "api_gateway_integration" {
  rest_api_id             = var.rest_api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.api_gateway_method.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_invoke_arn
}

resource aws_api_gateway_method_response "api_gateway_method_response" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = [aws_api_gateway_method.api_gateway_method]
}

resource aws_api_gateway_integration_response "api_gateway_integration_response" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = aws_api_gateway_method_response.api_gateway_method_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = var.origin
  }

  depends_on = [aws_api_gateway_method_response.api_gateway_method_response, aws_api_gateway_integration.api_gateway_integration]
}

resource aws_lambda_permission "get_lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${var.rest_api_id}/*/${aws_api_gateway_method.api_gateway_method.http_method}${var.resource_path}"
}
