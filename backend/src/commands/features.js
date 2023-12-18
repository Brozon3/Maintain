import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const callUpdateFeatures = async (featureID, propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `CALL Maintain_Database.updateFeatures(?, ?, @message_res)`;

      conn.query(sql, [featureID, propertyID], function (err, result) {
        if (err) {
          console.error("Error updating appliance: ", err);
          reject(err);
        } else {
          const responseParams = "SELECT @message_res AS message_res";
          conn.query(responseParams, function (err, outputResult) {
            if (err) {
              console.error("Error deleting output parameters:", err);
              reject(err);
            } else {
              const message = outputResult[0].message_res;
              console.log("Output parameters:", message);
              resolve({ message: message });
            }
          });
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};
