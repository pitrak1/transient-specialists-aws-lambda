module "delete_equipment_lambda" {
  source = "./lambda"

  function_name         = "deleteEquipment"
  handler               = "handlers/deleteEquipment.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteEquipment"
}

module "delete_events_lambda" {
  source = "./lambda"

  function_name         = "deleteEvents"
  handler               = "handlers/deleteEvents.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteEvents"
}

module "delete_models_lambda" {
  source = "./lambda"

  function_name         = "deleteModels"
  handler               = "handlers/deleteModels.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteModels"
}

module "delete_oems_lambda" {
  source = "./lambda"

  function_name         = "deleteOems"
  handler               = "handlers/deleteOems.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteOems"
}

module "delete_types_lambda" {
  source = "./lambda"

  function_name         = "deleteTypes"
  handler               = "handlers/deleteTypes.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteTypes"
}

module "get_equipment_lambda" {
  source = "./lambda"

  function_name         = "getEquipment"
  handler               = "handlers/getEquipment.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getEquipment"
}

module "get_events_lambda" {
  source = "./lambda"

  function_name         = "getEvents"
  handler               = "handlers/getEvents.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getEvents"
}

module "get_models_lambda" {
  source = "./lambda"

  function_name         = "getModels"
  handler               = "handlers/getModels.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getModels"
}

module "get_oems_lambda" {
  source = "./lambda"

  function_name         = "getOems"
  handler               = "handlers/getOems.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getOems"
}

module "get_types_lambda" {
  source = "./lambda"

  function_name         = "getTypes"
  handler               = "handlers/getTypes.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getTypes"
}

module "patch_equipment_lambda" {
  source = "./lambda"

  function_name         = "patchEquipment"
  handler               = "handlers/patchEquipment.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchEquipment"
}

module "patch_events_lambda" {
  source = "./lambda"

  function_name         = "patchEvents"
  handler               = "handlers/patchEvents.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchEvents"
}

module "patch_models_lambda" {
  source = "./lambda"

  function_name         = "patchModels"
  handler               = "handlers/patchModels.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchModels"
}

module "patch_oems_lambda" {
  source = "./lambda"

  function_name         = "patchOems"
  handler               = "handlers/patchOems.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchOems"
}

module "patch_types_lambda" {
  source = "./lambda"

  function_name         = "patchTypes"
  handler               = "handlers/patchTypes.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchTypes"
}

module "post_equipment_lambda" {
  source = "./lambda"

  function_name         = "postEquipment"
  handler               = "handlers/postEquipment.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postEquipment"
}

module "post_events_lambda" {
  source = "./lambda"

  function_name         = "postEvents"
  handler               = "handlers/postEvents.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postEvents"
}

module "post_models_lambda" {
  source = "./lambda"

  function_name         = "postModels"
  handler               = "handlers/postModels.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postModels"
}

module "post_oems_lambda" {
  source = "./lambda"

  function_name         = "postOems"
  handler               = "handlers/postOems.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postOems"
}

module "post_types_lambda" {
  source = "./lambda"

  function_name         = "postTypes"
  handler               = "handlers/postTypes.handler"
  db_instance_address   = "${module.rds_dev.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postTypes"
}










