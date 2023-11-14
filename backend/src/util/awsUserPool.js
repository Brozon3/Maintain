import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import nodeFetch from "node-fetch";
import pkg from "aws-sdk";
const { CognitoIdentityCredentials } = pkg;

//Allows in-built global fetch from front end.
global.fetch = nodeFetch;

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID,
};

export const awsUserPool = new CognitoUserPool(poolData);
