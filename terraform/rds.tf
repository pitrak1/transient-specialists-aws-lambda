resource "aws_db_instance" "transient_specialists_dev" {
  allocated_storage    = 20
  max_allocated_storage = 100
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "10.6"
  instance_class       = "db.t2.micro"
  name                 = "${var.DB_NAME}"
  username             = "${var.DB_MASTER_USERNAME}"
  password             = "${var.DB_MASTER_PASSWORD}"
  publicly_accessible = "true"
  vpc_security_group_ids = ["${aws_security_group.allow_tpc.id}"]
  skip_final_snapshot = "true"
}

resource "aws_security_group" "allow_tpc" {
  name        = "allow_tpc"
  description = "Allow TPC traffic"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}