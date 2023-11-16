import mysql from "mysql";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accesKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const DocumentClient = new AWS.DynamoDB.DocumentClient();
export const TABLE_NAME = "users";

export const testGetUsers = {
  path: "/api/users",
  method: "get",
  handler: (req, res) => {
    conn.connect(function (err) {
      conn.query(
        `SELECT * FROM Maintain_Database.users`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  },
};

export const insertNewUser = async (userObject) => {
  const { email } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = "INSERT INTO Maintain_Database.users (email) VALUES (?)";

      conn.query(sql, [email], function (err, result) {
        if (err) {
          console.error("Error inserting user:", err);
          reject(err);
        } else {
          console.log("User inserted successfully");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const insertUser = async (itemObject) => {
  const params = {
    TableName: TABLE_NAME,
    Item: itemObject,
  };
  const result = await DocumentClient.put(params).promise();
  console.log(result);
  return result;
};

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
    TableName: TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  console.log("Query params:", params);
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

export const deleteSingleUserById = async (TABLE_NAME, id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await DocumentClient.delete(params).promise();
};

export const verifyUser = async (userID) => {
  const params = {
    TableName: "users",
    Key: {
      userID: userID,
    },
    UpdateExpression: "set isVerified = :val",
    ExpressionAttributeValues: {
      ":val": true,
    },
    ReturnValues: "NONE",
  };
  try {
    const result = await DocumentClient.update(params).promise();
    return result.Attributes;
  } catch (e) {
    console.error("Update user failed", e);
    throw e;
  }
};

export const updateGoogleUser = async (itemObject) => {
  const { id: userID, email, name, verified_email } = itemObject.oauthUserInfo;
  const params = {
    TableName: "users",
    Item: {
      userID: parseInt(userID),
      email: email,
      name: name,
      isVerified: verified_email,
    },
    // UpdateExpression:
    //   "set #googleId = :valGoogleId, #isVerified = :valIsVerified",
    // ExpressionAttributeNames: {
    //   "#googleId": "googleId",
    //   "#isVerified": "isVerified",
    // },
    // ExpressionAttributeValues: {
    //   ":valGoogleId": updatedUserData.googleId,
    //   ":valIsVerified": updatedUserData.isVerified,
    // },
    ReturnValues: "ALL_OLD",
  };
  try {
    const result = await DocumentClient.put(params).promise();
    return params.Item;
  } catch (e) {
    console.error("Update user failed", e);
    throw e;
  }
};

// Likely to be outsourced & removed.
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
