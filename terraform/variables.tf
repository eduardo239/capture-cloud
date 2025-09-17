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
  description = "SQL Username"
  type = string
}
variable "sql_password" {
  description = "SQL Password"
  type = string
}
variable "sql_database" {
  description = "SQL database"
  type = string
}
variable "db_instance_type" {
  description = "Database Instance Type"
  type = string
}
