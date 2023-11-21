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

//Get properties by list of property IDs. Part of DisplayProperties page.
export const getPropertiesByIDs = async (propertyIDs) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.properties WHERE propertyID IN (${propertyIDs})`;

      conn.query(sql, propertyIDs, function (err, result) {
        if (err) {
          console.error("Error getting Properties: ", err);
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

export const deleteProperty = async (propertyObject) => {
  const { propertyID } = propertyObject;

  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM Maintain_Database.properties WHERE propertyID = ?`;

      conn.query(sql, [parseInt(propertyID)], function (err, result) {
        if (err) {
          console.error("Error deleting Property: ", err);
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            console.log("Property deleted successfully.");
            resolve(result);
          } else {
            console.log("Property not found.");
            resolve(null);
          }
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

export const dissociateUserProperty = async (propertyObject) => {
  const { propertyID } = propertyObject;

  return new Promise((resolve, reject) => {
    try {
      const sql =
        "DELETE FROM Maintain_Database.userProperty WHERE propertyID = ?";

      conn.query(sql, [parseInt(propertyID)], function (err, result) {
        if (err) {
          console.error("Error deleting property:", err);
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            console.log("Property dissociation complete.");
            resolve(result);
          } else {
            console.log("User property association not found.");
            resolve(null);
          }
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
      const checkIfExistsSql =
        "SELECT * FROM Maintain_Database.properties WHERE address = ? AND city = ? AND prov = ?";
      conn.query(
        checkIfExistsSql,
        [address, city, prov],
        function (err, result) {
          if (err) {
            console.error("Error checking for existing properties", err);
            reject(err);
          } else {
            if (result.length > 0) {
              resolve(null);
            } else {
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
            }
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

export const getPropertyTaskIDs = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.propertyTasks WHERE 
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
