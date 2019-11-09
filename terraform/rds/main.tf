resource "aws_db_instance" "db_instance" {
  allocated_storage      = 20
  max_allocated_storage  = 100
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "10.6"
  deletion_protection    = "true"
  identifier             = "${var.db_identifier}"
  instance_class         = "db.t2.micro"
  name                   = "${var.db_name}"
  username               = "${var.db_master_username}"
  password               = "${var.db_master_password}"
  publicly_accessible    = "true"
  vpc_security_group_ids = ["${aws_security_group.security_group.id}"]
  skip_final_snapshot    = "true"
}

resource "aws_security_group" "security_group" {
  name        = "allow_tcp"
  description = "Allow TPC traffic"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
