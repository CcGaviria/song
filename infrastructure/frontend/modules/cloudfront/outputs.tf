/**
  * @desc this class show the module exit
  * @author Cristian Gaviria Cristian@gaviria.org
*/

output "domain_name" {
  value = "${aws_cloudfront_distribution.cdft_distribution.domain_name}"
}

output "hosted_zone_id" {
  value = "${aws_cloudfront_distribution.cdft_distribution.hosted_zone_id}"
}
