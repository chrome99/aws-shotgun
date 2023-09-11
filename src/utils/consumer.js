import { Consumer } from 'sqs-consumer'
import { SQSClient } from '@aws-sdk/client-sqs'
import { handler } from '../consumer/index.js'

/**
 * Consumer app for Amazon EC2 Spot Instances.
 */
const app = Consumer.create({
  queueUrl: process.env.SQS_QUEUE_URL,
  batchSize: Math.min(parseInt(process.env.SQS_BATCH_SIZE), 10),
  handleMessageBatch: async (messages) => {
    const processed = await handler(messages);
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
