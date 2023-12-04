import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

export const getFeatureTypes = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT featureType FROM Maintain_Database.features";

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting feature types: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};