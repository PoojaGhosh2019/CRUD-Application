Basic CRUD Application development documentation:

Deploying Backend in AWS serverless using Serverless Framework
a. AWS Lambda functions which gets invoked through HTTP events POST, GET, DELETE through API Gateway.

b. Create backend for accessing the database, data stored in dynamoDB table. 

It provides following three API endpoints.

POST - https://6oj8ul6o85.execute-api.us-east-1.amazonaws.com/dev/v1/user

GET - https://6oj8ul6o85.execute-api.us-east-1.amazonaws.com/dev/v1/user/{name}

DELETE - https://6oj8ul6o85.execute-api.us-east-1.amazonaws.com/dev/v1/user/{name}

Following dependent module needs to be installed locally:

Serverless
AWS-SDK
Express
Body-Parser
