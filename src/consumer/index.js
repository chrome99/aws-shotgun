import fetch from 'node-fetch'

/**
 * This script is the handler that performs any manipulation of the message
 * before it is uploaded to Amazon S3. It must return the string data that will
 * be written to the S3 bucket.
 *
 * @param {object} message The SQS message body as a JSON object
 * @return {object} The processed data to write to S3
 */
export async function handler(message) {
  // Make the request
  const response = await fetch(message.url)

  // Get the response body as JSON
  const body = await response.json()

  // (TODO) Add your processing logic here...

  // Return the output that will be written to S3
  return body
}