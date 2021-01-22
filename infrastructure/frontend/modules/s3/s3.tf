/**
  * @desc this is a resource
  * @author Cristian Gaviria Cristian@gaviria.org
*/

resource "aws_s3_bucket" "b" {
  bucket = var.bucket_name
  acl = "public-read"

  website {
      redirect_all_requests_to = "https://music.gaviria.org"
  }
}
