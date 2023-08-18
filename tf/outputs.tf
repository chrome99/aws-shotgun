# Output values make information about your infrastructure available on the
# command line, and can expose information for other Terraform configurations
# to use. Output values are similar to return values in programming languages.
# https://developer.hashicorp.com/terraform/language/values/outputs

# The AWS Lambda function that has been created.
output "lambda_function_arn" {
  description = "The AWS Lambda function ARN"
  value       = "TODO"
}

# The Amazon SQS queue that has been created.
output "sqs_queue_arn" {
  description = "The Amazon SQS queue ARN"
  value       = "TODO"
}

# The Amazon S3 bucket that has been created.
output "s3_bucket_arn" {
  description = "The Amazon S3 bucket ARN"
  value       = "TODO"
}

# The spot instance request that has been created.
output "spot_instance_request_id" {
  description = "The spot instance request ID"
  value       = "TODO"
}