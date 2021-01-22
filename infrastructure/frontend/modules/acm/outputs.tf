/**
  * @desc this class show the module exit
  * @author Cristian Gaviria Cristian@gaviria.org
*/

output "arn" {
  value = aws_acm_certificate_validation.default.certificate_arn
}
