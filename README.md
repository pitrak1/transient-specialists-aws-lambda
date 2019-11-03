# Transient Specialists Lambda

This repository contains lambda code to be run by the REST API for the Transient Specialists inventory application. It also contains terraform code to manage the lambda functions, the API Gateway REST API, and the Postgres RDS database. The front end application that is meant to be used with this repository is [Transient Specialists React](https://github.com/pitrak1/transient-specialists-react).

## Development

The `terraform apply` command will upload all the lambda function code to all lambda functions. However, if an apply changes things on the API Gateway, a deploy must manually be performed through the AWS Management Console or through the API CLI.
