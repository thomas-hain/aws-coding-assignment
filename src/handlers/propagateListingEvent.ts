import { type DynamoDBStreamEvent, type Context, type APIGatewayProxyEvent, type APIGatewayProxyResult, type StreamRecord, type DynamoDBRecord } from 'aws-lambda'
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns'
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

import Listing from '../models/listing';

const client = new SNSClient({});

export default async (event: DynamoDBStreamEvent): Promise<void> => {
  console.log('Received event:', JSON.stringify(event, null, 2))

  const listings = event.Records.reduce((records: Listing[], current: DynamoDBRecord): Listing[] => {
      const newImage = current.dynamodb?.NewImage;
      if (newImage) {
          const unmarshalled = unmarshall(newImage as Record<string, AttributeValue>);
          records.push(unmarshalled as Listing)
      }
      return records
  }, []);

  const insertItem = new PublishCommand({TopicArn: process.env.LISTING_SNS as string, Message: JSON.stringify(listings) });

  await client.send(insertItem)
}
