/**
  * @desc this is a module provider
  * @author Cristian Gaviria Cristian@gaviria.org
*/

provider "aws" {
  alias = "acm_account"
  region = "us-east-1"
}

provider "aws" {
  alias = "route53_account"
  region = "us-east-1"
}

