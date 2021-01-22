/**
  * @desc Invoke module env
  * @author Cristian Gaviria Cristian@gaviria.org
*/

module "r53" {
  zone_id = var.zone_domain
  source = "../../modules/r53"
  project_name   = var.project_name
  environment    = var.environment
  domain = var.domain
  subdomain = var.subdomain
  public_ip = "${module.cloudfront.domain_name}"
  hosted_zone = "${module.cloudfront.hosted_zone_id}"
}
