import { Stack, type StackProps } from 'aws-cdk-lib'
import * as dynamo from 'aws-cdk-lib/aws-dynamodb'
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import {Runtime} from 'aws-cdk-lib/aws-lambda'

import * as sns from 'aws-cdk-lib/aws-sns'
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources'
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions'
import * as sqs from 'aws-cdk-lib/aws-sqs'

import { type Construct } from 'constructs'
import path = require('node:path')


export class CdkStack extends Stack {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const table = new dynamo.Table(this, 'ListingsTable', {
        partitionKey: { name: 'id', type: dynamo.AttributeType.STRING },
        stream: dynamo.StreamViewType.NEW_IMAGE }
    )

    const addListingLambda = new lambda.NodejsFunction(this, 'AddListingFunction', {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../../src/handlers/addListing.ts'),
      bundling: {
          target: 'es2020',
      },
      environment: {
      },
    });

    const api = new apigateway.RestApi(this, 'RealEstateAPI');

    const addListingIntegration = new apigateway.LambdaIntegration(addListingLambda);
    const resource = api.root.addResource('listing');
    
    resource.addMethod('POST', addListingIntegration);
  }
}

