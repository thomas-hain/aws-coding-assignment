# Real Estate Listing Service

## Overview

This project is designed to manage real estate listings through a serverless architecture using AWS services. It features the creation and retrieval of real estate listings stored in a DynamoDB table, and the use of AWS Lambda functions for processing. Additionally, it employs SNS (Simple Notification Service) for propagating listing events.

## Features

- **Add Listing**: A Lambda function (`addListingLambda`) to store new listings in the `ListingsTable` in DynamoDB.
- **Get Listing**: A Lambda function (`getListingLambda`) to retrieve listings from the database.
- **Propagate Listing Event**: A Lambda function (`propagateListingEvent`) to publish newly inserted listings to an SNS topic.
- **AWS CDK Stack**: AWS Cloud Development Kit (CDK) stack (`stack.ts`) to define AWS resources.

## Project Structure

- `addListing.ts`: AWS Lambda function for adding new listings.
- `getListing.ts`: AWS Lambda function for retrieving listings.
- `propagateListingEvent.ts`: AWS Lambda function for publishing listing events to an SNS topic.
- `stack.ts`: CDK stack definition for AWS resources.

## Development Tasks

- 1. Add an endpoint for the `getListingLambda`.
- 2. Ensure that the `getListingLambda` endpoint can return listings from our database.
- 3. Fix the current `addListingLambda` function to correctly store new listings in the 'ListingsTable'.
- 4. Set up an SNS topic to publish newly inserted listings.
- 5. On every listing insertion, publish the inserted listings to the newly created SNS.
- 6. Generate the stack's template

**Important Information regarding Deployment**
You won't be able to deploy this project. Generating an AWS stack template is sufficient!

## Getting Started

### Prerequisites

- AWS Account and AWS CLI configured.
- Node.js and npm installed.
- AWS CDK installed.

## Contributing

Contributions to improve the project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes.
4. Submit a pull request with a clear description of the changes.
