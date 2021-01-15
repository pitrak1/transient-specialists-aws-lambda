resource aws_s3_bucket "transient-specialists-files" {
  bucket = var.s3_bucket_name
  acl = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["http://localhost:8080", "http://transientspecialistsinventory.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}