/**
  * @desc this is a resource
  * @author Cristian Gaviria Cristian@gaviria.org
*/

locals {
  origin_id = "origin-${var.project_name}-${var.environment}"
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${var.bucket_arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "example" {
  bucket = var.bucket_id
  policy = data.aws_iam_policy_document.s3_policy.json
}


resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "${var.project_name}-${var.environment}"
}

resource "aws_cloudfront_distribution" "cdft_distribution" {
  origin {
    domain_name = var.domain_name

    origin_id   = local.origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }


  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project_name}-${var.environment}"
  default_root_object = "index.html" //&


  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  tags = {
    Environment = "${var.project_name}-${var.environment}"
  }
  aliases = ["${var.cname}"]

  viewer_certificate {
    acm_certificate_arn = var.arn_acm
    minimum_protocol_version = "TLSv1"
    ssl_support_method = "sni-only"

    #cloudfront_default_certificate = true
  }
}
