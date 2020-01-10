module "delete_equipment_lambda" {
  source = "./lambda"

  function_name         = "deleteEquipment"
  handler               = "handlers/deleteEquipment.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteEquipment"
}

module "delete_events_lambda" {
  source = "./lambda"

  function_name         = "deleteEvents"
  handler               = "handlers/deleteEvents.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteEvents"
}

module "delete_models_lambda" {
  source = "./lambda"

  function_name         = "deleteModels"
  handler               = "handlers/deleteModels.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteModels"
}

module "delete_oems_lambda" {
  source = "./lambda"

  function_name         = "deleteOems"
  handler               = "handlers/deleteOems.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteOems"
}

module "delete_types_lambda" {
  source = "./lambda"

  function_name         = "deleteTypes"
  handler               = "handlers/deleteTypes.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteTypes"
}

module "delete_itemgroups_lambda" {
  source = "./lambda"

  function_name         = "deleteItemGroups"
  handler               = "handlers/deleteItemGroups.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteItemGroups"
}

module "get_equipment_lambda" {
  source = "./lambda"

  function_name         = "getEquipment"
  handler               = "handlers/getEquipment.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getEquipment"
}

module "get_events_lambda" {
  source = "./lambda"

  function_name         = "getEvents"
  handler               = "handlers/getEvents.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getEvents"
}

module "get_models_lambda" {
  source = "./lambda"

  function_name         = "getModels"
  handler               = "handlers/getModels.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getModels"
}

module "get_oems_lambda" {
  source = "./lambda"

  function_name         = "getOems"
  handler               = "handlers/getOems.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getOems"
}

module "get_types_lambda" {
  source = "./lambda"

  function_name         = "getTypes"
  handler               = "handlers/getTypes.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getTypes"
}

module "get_itemgroups_lambda" {
  source = "./lambda"

  function_name         = "getItemGroups"
  handler               = "handlers/getItemGroups.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getItemGroups"
}

module "patch_equipment_lambda" {
  source = "./lambda"

  function_name         = "patchEquipment"
  handler               = "handlers/patchEquipment.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchEquipment"
}

module "patch_events_lambda" {
  source = "./lambda"

  function_name         = "patchEvents"
  handler               = "handlers/patchEvents.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchEvents"
}

module "patch_models_lambda" {
  source = "./lambda"

  function_name         = "patchModels"
  handler               = "handlers/patchModels.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchModels"
}

module "patch_oems_lambda" {
  source = "./lambda"

  function_name         = "patchOems"
  handler               = "handlers/patchOems.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchOems"
}

module "patch_types_lambda" {
  source = "./lambda"

  function_name         = "patchTypes"
  handler               = "handlers/patchTypes.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchTypes"
}

module "patch_itemgroups_lambda" {
  source = "./lambda"

  function_name         = "patchItemGroups"
  handler               = "handlers/patchItemGroups.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/patchItemGroups"
}

module "post_equipment_lambda" {
  source = "./lambda"

  function_name         = "postEquipment"
  handler               = "handlers/postEquipment.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postEquipment"
}

module "post_events_lambda" {
  source = "./lambda"

  function_name         = "postEvents"
  handler               = "handlers/postEvents.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postEvents"
}

module "post_models_lambda" {
  source = "./lambda"

  function_name         = "postModels"
  handler               = "handlers/postModels.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postModels"
}

module "post_oems_lambda" {
  source = "./lambda"

  function_name         = "postOems"
  handler               = "handlers/postOems.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postOems"
}

module "post_types_lambda" {
  source = "./lambda"

  function_name         = "postTypes"
  handler               = "handlers/postTypes.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postTypes"
}

module "post_itemgroups_lambda" {
  source = "./lambda"

  function_name         = "postItemGroups"
  handler               = "handlers/postItemGroups.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postItemGroups"
}

module "generate_reports_lambda" {
  source = "./lambda"

  function_name         = "generateReports"
  handler               = "handlers/generateReports.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/generateReports"
}

module "post_files_lambda" {
  source = "./lambda"

  function_name         = "postFiles"
  handler               = "handlers/postFiles.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/postFiles"
}

module "delete_files_lambda" {
  source = "./lambda"

  function_name         = "deleteFiles"
  handler               = "handlers/deleteFiles.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/deleteFiles"
}

module "get_files_lambda" {
  source = "./lambda"

  function_name         = "getFiles"
  handler               = "handlers/getFiles.handler"
  db_instance_address   = "${module.rds.db_instance_address}"
  db_master_username    = "${var.db_master_username}"
  db_master_password    = "${var.db_master_password}"
  db_name               = "${var.db_name}"
  lambda_log_group_name = "/aws/lambda/getFiles"
}
