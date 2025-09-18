terraform plan -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars

Frontend → http://localhost:5173
Backend → http://localhost:5000
Postgres → localhost:5432 (postgres/postgres/mydb)
PgAdmin → http://localhost:8080 ( admin@admin.com @ admin )

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
