import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accesKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "users";

const getProperties = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const characters = await dynamoClient.scan(params).promise();
  console.log(characters);
  return characters;
};

const addOrUpdateProperties = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };
  return await dynamoClient.put(params).promise();
};

getProperties();

const property = {
  id: 0,
  name: "123 Fake Street",
  color: "Purple",
};

//addOrUpdateProperties(property);
