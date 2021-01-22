/**
  * @desc Invoke module env
  * @author Cristian Gaviria Cristian@gaviria.org
*/

module "s3" {
  source = "../../modules/s3"
  bucket_name = "${lower(var.project_name)}-${var.environment}-${var.domain}"
}
