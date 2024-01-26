import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda'
import {DynamoDBClient, PutItemCommand} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({});

export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event, null, 2))

  if (!event.body){
      // return an error
      throw 'No body';
  }

  const body = JSON.parse(event.body);

  const insertItem = new PutItemCommand({TableName: process.env.LISTING_DB as string, Item: body});

  await client.send(insertItem)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Processing complete' })
  }
}
