/**
  * @desc Invoke module env
  * @author Cristian Gaviria Cristian@gaviria.org
*/

module "cloudfront" {
  source = "../../modules/cloudfront"
  project_name   = var.project_name
  environment    = var.environment
  domain_name = module.s3.bucket_domain_name
  cname = "${var.subdomain}.${var.domain}"
  arn_acm = module.acm.arn
  bucket_id = module.s3.bucket_id
  bucket_arn = module.s3.bucket_arn
}
