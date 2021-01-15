resource aws_s3_bucket "transient-specialists-files" {
  bucket = "transient-specialists-files"
  acl = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["http://localhost:8080"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}