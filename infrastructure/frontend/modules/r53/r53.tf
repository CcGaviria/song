/**
  * @desc this is a resource
  * @author Cristian Gaviria Cristian@gaviria.org
*/

resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = "${var.subdomain}.${var.domain}"
  type = "A"

  alias {
    name = var.public_ip
    zone_id = var.hosted_zone
    evaluate_target_health = false
  }
}
resource "aws_route53_record" "wwwipv6" {
  zone_id = var.zone_id
  name    = "${var.subdomain}.${var.domain}"
  type = "AAAA"

  alias {
    name = var.public_ip
    zone_id = var.hosted_zone
    evaluate_target_health = false
  }
}
#name = "${aws_cloudfront_distribution.cdn.domain_name}"
#zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
