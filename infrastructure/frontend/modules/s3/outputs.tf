/**
  * @desc this class show the module exit
  * @author Cristian Gaviria Cristian@gaviria.org
*/

output "bucket_domain_name" {
  value = "${aws_s3_bucket.b.bucket_domain_name}"
}
output "bucket_id" {
  value = "${aws_s3_bucket.b.id}"
}

output "bucket_arn" {
  value = "${aws_s3_bucket.b.arn}"
}
