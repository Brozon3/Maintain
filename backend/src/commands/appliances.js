import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

export const getAllAppliances = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM Maintain_Database.appliances";

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