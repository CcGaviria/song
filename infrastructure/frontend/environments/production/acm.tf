/**
  * @desc Invoke module env
  * @author Cristian Gaviria Cristian@gaviria.org
*/

module "acm" {
  source = "../../modules/acm"

  environment = var.environment
  project_name = var.project_name
  domain_name                       = var.domain
  subject_alternative_names         = ["${var.subdomain}.${var.domain}"]
  hosted_zone_id                    = var.zone_domain
  validation_record_ttl             = "60"
  allow_validation_record_overwrite = true
}
