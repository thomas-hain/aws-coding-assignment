import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda'
export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const parameters = '';

  // TODO: use parameters to fetch a listing

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Processing complete' })
  }
}
