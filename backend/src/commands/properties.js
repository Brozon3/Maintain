import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const getAllProperties = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.properties`;

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

export const getPropertyByID = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.properties WHERE 
      propertyID = ?`;

      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting Property: ", err);
          reject(err);
        } else {
          console.log("Successfully got property.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

export const getPropertiesByIDs = async (propertyIDs) => {
  return new Promise((resolve, reject) => {
    try {
      // Create an array of placeholders based on the number of property IDs
      const placeholders = Array.from(
        { length: propertyIDs.length },
        () => "?"
      ).join(", ");

      const sql = `SELECT * FROM Maintain_Database.properties WHERE propertyID IN (${placeholders})`;

      conn.query(sql, propertyIDs, function (err, result) {
        if (err) {
          console.error("Error getting Properties: ", err);
          reject(err);
        } else {
          console.log("Successfully got properties.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

export const deleteProperty = async (userObject) => {
  const { propertyID } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM Maintain_Database.users WHERE (propertyID) = ?`;

      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error deleting Property: ", err);
          reject(err);
        } else {
          console.log("Property deleted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

export const insertProperty = async (propertyObject) => {
  const { address, city, prov, type, roof, carpet, pets, heatingType } =
    propertyObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.properties (address, city, prov, type ,roof, carpet, pets, heating) VALUES (?,?,?,?,?,?,?,?)";
      conn.query(
        sql,
        [address, city, prov, type, roof, carpet, pets, heatingType],
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

      conn.query(sql, [user.userID, propertyId], function (err, result) {
        if (err) {
          console.error("Error inserting property:", err);
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
