import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const insertProperty = async (propertyObject) => {
  const { address, city, province, type, roof, carpet, pets, heatingType } =
    propertyObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.properties (address, city, prov, type ,roof, carpet, pets, heating) VALUES (?,?,?,?,?,?,?,?)";
      conn.query(
        sql,
        [address, city, province, type, roof, carpet, pets, heatingType],
        function (err, result) {
          if (err) {
            console.error("Error inserting property:", err);
            reject(err);
          } else {
            console.log("Property inserted successfully");
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

export const associateProperty = async (propertyObject) => {
  const { user, propertyId } = propertyObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.userProperty (userID, propertyID) VALUES (?,?)";

      conn.query(sql, [user.id, propertyId], function (err, result) {
        if (err) {
          console.error("Error inserting property:", err);
          reject(err);
        } else {
          console.log("Property inserted successfully");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};
