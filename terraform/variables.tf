variable "project_id" {
  description = "Project ID"
  type = string
}
variable "region" {
  description = "GCP region"
  type = string
}
# Sql instance details
variable "sql_username" {
  description = "username"
  type = string
}
variable "sql_password" {
  description = "password"
  type = string
}
variable "sql_database" {
  description = "database"
  type = string
}
variable "db_instance_type" {
  description = "instance type"
  type = string
}
