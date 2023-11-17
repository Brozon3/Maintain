import mysql from "mysql";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import mysql from "mysql";
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

export const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM Maintain_Database.users WHERE email = ?";

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
          const selectSql =
            "SELECT userID FROM Maintain_Database.users WHERE email = ?";
          conn.query(selectSql, [email], function (err, selectResult) {
            if (err) {
              console.error("Error retrieving updated user data:", err);
              reject(err);
            } else {
              resolve(selectResult || []);
            }
          });
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const verifyUser = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "UPDATE Maintain_Database.users SET is_verified = 1 WHERE email = ?";

      conn.query(sql, [email], function (err, result) {
        if (err) {
          console.error("Error updating user:", err);
          reject(err);
        } else {
          console.log("User verified successfully");

          const selectSql =
            "SELECT * FROM Maintain_Database.users WHERE email = ?";
          conn.query(selectSql, [email], function (err, selectResult) {
            if (err) {
              console.error("Error retrieving updated user data:", err);
              reject(err);
            } else {
              resolve(selectResult || []);
            }
          });
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const insertUser = async (userObject) => {
  const { email, passwordHash, isVerified, verificationString } = userObject;
  // hard coded for now.
  const maxProperties = 3;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.users (email, max_properties, is_verified, password_hash) VALUES (?,?,?,?)";
      conn.query(
        sql,
        [email, maxProperties, passwordHash, isVerified],
        function (err, result) {
          if (err) {
            console.error("Error inserting user:", err);
            reject(err);
          } else {
            console.log("User inserted successfully");
            resolve(result);
          }
        }
      );
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const addProperty = {
  path: "/api/addProperty",
  method: "post",
  handler: (req, res) => {
    const { address, city, prov, type, roof, carpet, pets, heating } = req.body;
    conn.connect(function (err) {
      const sql = `INSERT INTO Maintain_Database.properties(address, city, prov, type, roof, carpet, pets, heating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      conn.query(
        sql,
        [address, city, prov, type, roof, carpet, pets, heating],
        function (err, result, fields) {
          if (err) console.log(err);
          if (result) res.send(req.body);
          if (fields) console.log(fields);
        }
      );
    });
  },
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

export const insertUser = async (userObject) => {
  const { email, passwordHash, isVerified, verificationString } = userObject;
  // hard coded for now.
  const maxProperties = 3;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.users (email, max_properties, is_verified, password_hash) VALUES (?,?,?,?)";
      conn.query(
        sql,
        [email, maxProperties, passwordHash, isVerified],
        function (err, result) {
          if (err) {
            console.error("Error inserting user:", err);
            reject(err);
          } else {
            console.log("User inserted successfully");
            resolve(result);
          }
        }
      );
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const addProperty = {
  path: "/api/addProperty",
  method: "post",
  handler: (req, res) => {
    const { address, city, prov, type, roof, carpet, pets, heating } = req.body;
    conn.connect(function (err) {
      const sql = `INSERT INTO Maintain_Database.properties(address, city, prov, type, roof, carpet, pets, heating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      conn.query(
        sql,
        [address, city, prov, type, roof, carpet, pets, heating],
        function (err, result, fields) {
          if (err) console.log(err);
          if (result) res.send(req.body);
          if (fields) console.log(fields);
        }
      );
    });
  },
};

export const getAllUsers = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const items = await DocumentClient.scan(params).promise();
  console.log(items);
  return items;
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
