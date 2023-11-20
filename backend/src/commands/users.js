import mysql from "mysql";
import dotenv from "dotenv";
import AWS from "aws-sdk";

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

export const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.users`;

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting user: ", err);
          reject(err);
        } else {
          console.log("Successfully got all users.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

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
};

export const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM Maintain_Database.users WHERE email = ?";
      conn.query(sql, [email], function (err, result) {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            resolve(result);
          }
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const forgotPasswordCode = async (email, passwordResetCode) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM Maintain_Database.users WHERE email = ?";
      conn.query(sql, [email], function (err, result) {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const insertNewUser = async (userData) => {
  const { email, is_verified } = userData;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.users (email, is_verified) VALUES (?, ?)";

      conn.query(sql, [email, is_verified], function (err, result) {
        if (err) {
          console.error("Error inserting user:", err);
          reject(err);
        } else {
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
  const { email, passwordHash, isVerified } = userObject;
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

export const updateGoogleUser = async (itemObject) => {
  const { userID, email, name, is_verified, max_properties } = itemObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "UPDATE Maintain_Database.users SET email = ?, name= ?, max_properties = ?, is_verified = ? WHERE userID = ?";
      conn.query(
        sql,
        [email, name, max_properties, is_verified, userID],
        function (err, result) {
          if (err) {
            console.error("Error inserting user:", err);
            reject(err);
          } else {
            resolve({ email, name, max_properties, is_verified, userID });
          }
        }
      );
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const getPropertyIdsByUser = async (userID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "SELECT * FROM Maintain_Database.userProperty WHERE userID = ?";
      conn.query(sql, [userID], function (err, result) {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};
