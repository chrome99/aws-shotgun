import { Consumer } from 'sqs-consumer'
import { SQSClient } from '@aws-sdk/client-sqs'
import { handler } from '../consumer/index.js'

/**
 * Consumer app for Amazon EC2 Spot Instances.
 */
const app = Consumer.create({
  queueUrl: process.env.SQS_QUEUE_URL,
  batchSize: parseInt(process.env.SQS_BATCH_SIZE, 1),
  handleMessageBatch: async (messages) => {
    const processed = []

    for (const message of messages) {
      // Call the user-defined handler
      await handler(JSON.parse(message.Body))

      // Add the message to the processed list
      processed.push(message)
    }

    return processed
  },
  sqs: new SQSClient({
    region: process.env.AWS_REGION
  })
})

app.on('error', (err) => {
  console.error(err.message)
})

app.on('processing_error', (err) => {
  console.error(err.message)
})

app.start()
