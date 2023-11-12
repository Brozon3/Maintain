import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accesKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const DocumentClient = new AWS.DynamoDB.DocumentClient();
export const TABLE_NAME = "users";

export const getAllUsers = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const items = await DocumentClient.scan(params).promise();
  console.log(items);
  return items;
};

export const getUserByEmail = async (email) => {
  const params = {
    TableName: "users",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  try {
    const result = await DocumentClient.query(params).promise();
    console.log("Query result:", result);

    if (result.Count > 0) {
      return result.Items[0]; // Match the first user found in the query.
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    throw error;
  }
};

export const updateUser = async (itemObject) => {
  const params = {
    TableName: "users",
    Item: ItemObject,
  };
  return await DocumentClient.put(params).promise();
};

export const insertUser = async (itemObject) => {
  const params = {
    TableName: "users",
    Item: itemObject,
  };
  return await DocumentClient.put(params).promise();
};

// Likely to be outsourced.
export const forgotPasswordCode = async (email, passwordResetCode) => {
  const params = {
    TableName: "users",
    Key: {
      email: email,
    },
    UpdateExpression: "SET passwordResetCode = :newValue",
    ExpressionAttributeValues: {
      ":newValue": passwordResetCode,
    },
    IndexName: "email-index",
  };
  const response = await DocumentClient.update(params, (err, data) => {
    if (err) {
      console.err("User update failed. Error: ", Json.stringify(err));
    } else {
      console.log("Password reset updated.");
    }
  });
};

export const getSinglePropertyByID = async (TABLE_NAME, id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  const item = await DocumentClient.get(params).promise();
  console.log(item);
  return item;
};

export const getAllProperties = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const items = await DocumentClient.scan(params).promise();
  console.log(items);
  return items;
};

export const insertProperty = async (TABLE_NAME, itemObject) => {
  const params = {
    TableName: TABLE_NAME,
    Item: itemObject,
  };
  return await DocumentClient.put(params).promise();
};

export const deleteSinglePropertyById = async (TABLE_NAME, id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await DocumentClient.delete(params).promise();
};
