import fetch from 'node-fetch'
import { writeOutput } from '../utils/writeOutput.js'

/**
 * This script is the handler that performs any manipulation of the message
 * before it is uploaded to Amazon S3. It must return the string data that will
 * be written to the S3 bucket.
 *
 * @param {object} message The SQS message body as a JSON object
 * @return {void}
 */
export async function handler(messages) {
  try {
    const responses = await Promise.allSettled(
      messages.map(async message => {
        const parsedMessage = JSON.parse(message.Body);
        const url = parsedMessage.url;
        const urlWithProtocol = url.startsWith("http") ? url : `http://${url}`;

        console.log("Handling url: ", urlWithProtocol);
        return await fetchWithTimeout(urlWithProtocol, process.env.FETCH_TIMEOUT);
      })
    )
    
    console.log("Responses are back!");
    const okResponses = responses
    .filter((res) => {
      if (res.status === "fulfilled") {
        console.log('Response OK from ', res.value.url);
        return res;
      }
      else { console.error(res.reason) }
    })
    .map(res => res.value);

    // upload to s3 bucket
    await writeOutput(okResponses);

    return messages;
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

async function fetchWithTimeout(url, timeout) {  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);

  return response;
}