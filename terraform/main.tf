# Google Cloud Storage Bucket
resource "google_storage_bucket" "image_bucket" {
  name          = "${var.project_id}-image-bucket"
  location      = var.region
  force_destroy = true
}

# Cloud SQL PostgreSQL Instance
resource "google_sql_database_instance" "postgres" {
  name             = "image-app-db"
  database_version = "POSTGRES_15"
  region           = var.region
  settings {
    tier = var.db_instance_type # Smallest tier for dev
    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc.id
    }
  }
}

resource "google_sql_database" "app_db" {
  name     = "image_app"
  instance = google_sql_database_instance.postgres.name
}

# Cloud Run for Backend
resource "google_cloud_run_service" "backend" {
  name     = "backend-service"
  location = var.region
  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/backend:latest"
        env {
          name  = "DB_URL"
          value = "postgresql://${var.sql_username}:${var.sql_password}@${google_sql_database_instance.postgres.private_ip_address}:5432/${var.sql_database}"
        }
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Cloud Run for Frontend
resource "google_cloud_run_service" "frontend" {
  name     = "frontend-service"
  location = var.region
  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/frontend:latest"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# VPC for Private SQL Connection
resource "google_compute_network" "vpc" {
  name = "image-app-vpc"
}

# IAM for Cloud Run Invoker
resource "google_cloud_run_service_iam_member" "backend_invoker" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers" # Public access; restrict for prod
}

resource "google_cloud_run_service_iam_member" "frontend_invoker" {
  service  = google_cloud_run_service.frontend.name
  location = google_cloud_run_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}