import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

export const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.users`;

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting user: ", err);
          reject(err);
        } else {
          console.log("Successfully got all users.")
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const insertNewUser = async (userObject) => {
  const { email } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `INSERT INTO Maintain_Database.users (email) Values (?)`;

      conn.query(sql, [email], function (err, result) {
        if (err) {
          console.error("Error inserting user: ", err);
          reject(err);
        } else {
          console.log("User inserted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const deleteUser = async (userObject) => {
  const { userID } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM Maintain_Database.users WHERE (userID) = ?`;

      conn.query(sql, [userID], function (err, result) {
        if (err) {
          console.error("Error deleting user: ", err);
          reject(err);
        } else {
          console.log("User deleted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
}


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
  };
  try {
    const result = await DocumentClient.put(params).promise();
    return params.Item;
  } catch (e) {
    console.error("Update user failed", e);
    throw e;
  }
};