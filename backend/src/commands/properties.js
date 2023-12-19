import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const callRemoveProperty = async (propertyObject) => {
  const { propertyID } = propertyObject;

  return new Promise((resolve, reject) => {
    try {
      const sql = `CALL Maintain_Database.remove_property(?, @message_res)`;

      conn.query(sql, [parseInt(propertyID)], function (err, result) {
        if (err) {
          console.error("Error deleting Property: ", err);
          reject(err);
        } else {
          const responseSql = "SELECT @message_res as message";
          conn.query(responseSql, function (err, outputResult) {
            if (err) {
              console.error("Error fetching output parameters:", err);
              reject(err);
            } else {
              const response = outputResult[0].message;
              resolve(response);
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

export const callAddProperty = async (userID, propertyObject) => {
<<<<<<< HEAD
  const { address, city, prov, type, roof, exterior, carpet, pets, heating } =
=======
  const { address, city, prov, type, roof, carpet, pets, heating, exterior } =
>>>>>>> testing
    propertyObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "CALL Maintain_Database.add_property(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @propertyID_res, @message_res)";
      conn.query(
        sql,
<<<<<<< HEAD
        [userID, address, city, prov, carpet, heating, pets, type, roof, exterior],
=======
        [
          userID,
          address,
          city,
          prov,
          carpet,
          heating,
          pets,
          type,
          roof,
          exterior,
        ],
>>>>>>> testing
        function (err, result) {
          if (err) {
            console.error("Error adding property", err);
            reject(err);
          } else {
            const responseParams =
              "SELECT @propertyID_res AS propertyID_res, @message_res AS message_res";
            conn.query(responseParams, function (err, outputResult) {
              if (err) {
                console.error("Error fetching output parameters:", err);
                reject(err);
              } else {
                const propertyID = outputResult[0].propertyID_res;
                const message = outputResult[0].message_res;
                console.log("Output parameters:", propertyID, message);
                resolve({ propertyID: propertyID, message: message });
              }
            });
          }
        }
      );
    } catch (error) {
      console.error("Error connecting to the database:", error);
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
          resolve(result[0]);
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

export const getPropertyAppliances = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.applianceView WHERE 
      propertyID = ?`;
      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting Property Appliances: ", err);
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

export const getPropertyFeatures = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.featureView WHERE 
      propertyID = ?`;
      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting Property Features: ", err);
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

export const getPropertyTasks = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "SELECT * FROM Maintain_Database.propertyTaskView WHERE propertyID = ?";
      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting property tasks: ", err);
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
