import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const insertNewUser = async (userObject) => {
  const { email } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = "INSERT INTO Maintain_Database.properties (email) VALUES (?)";

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
