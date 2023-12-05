import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const getAllAppliances = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM Maintain_Database.appliances";

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting appliances: ", err);
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

export const getAllApplianceTypes = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT applianceType FROM Maintain_Database.appliances";

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting appliance types: ", err);
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

export const insertAppliance = async (userObject) => {
  const {
    type,
    manufacturer,
    model,
    serialNumber,
    purchaseDate,
    warrantyLength,
  } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `INSERT INTO Maintain_Database.appliances 
      (type, manufacturer, model, serialNumber, purchaseDate, warrantyLength) 
      Values (?, ?, ?, ?, ?, ?)`;

      conn.query(
        sql,
        [type, manufacturer, model, serialNumber, purchaseDate, warrantyLength],
        function (err, result) {
          if (err) {
            console.error("Error inserting appliance: ", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};

export const callRemoveAppliance = async (propertyApplianceID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `CALL Maintain_Database.remove_appliance(?, @message_res)`;

      conn.query(sql, [propertyApplianceID], function (err, result) {
        if (err) {
          console.error("Error deleting appliance: ", err);
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

export const associateAppliance = async (applianceObject) => {
  const { propertyID, applianceID } = applianceObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "INSERT INTO Maintain_Database.propertyAppliance (propertyID, applianceID) VALUES (?,?)";

      conn.query(sql, [applianceID, propertyID], function (err, result) {
        if (err) {
          console.error("Error inserting property appliance association:", err);
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

export const getAppliancesByIDs = async (applianceIDs) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.appliances WHERE applianceID IN (${applianceIDs})`;

      conn.query(sql, [applianceIDs], function (err, result) {
        if (err) {
          console.error("Error getting Appliances: ", err);
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

export const getApplianceTypes = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT applianceType FROM Maintain_Database.appliances";

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting appliance types: ", err);
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

export const callAddAppliance = async (userID, propertyID, taskObject) => {
  const {
    applianceType,
    manufacturer,
    model,
    serialNumber,
    purchaseDate,
    warrantyLength,
  } = taskObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "CALL Maintain_Database.add_propertyAppliance(?, ?, ?, ?, ?, ?, ?, ?, @propertyApplianceID_p)";
      conn.query(
        sql,
        [
          userID,
          propertyID,
          applianceType,
          serialNumber,
          purchaseDate,
          warrantyLength,
          manufacturer,
          model,
        ],
        function (err, result) {
          if (err) {
            console.error("Error adding appliance", err);
            reject(err);
          } else {
            const responseParams =
              "SELECT @propertyApplianceID_p AS propertyApplianceID_p";
            conn.query(responseParams, function (err, outputResult) {
              if (err) {
                console.error("Error fetching output parameters:", err);
                reject(err);
              } else {
                const propertyApplianceID =
                  outputResult[0].propertyApplianceID_p;
                console.log("Output parameters:", propertyApplianceID);
                resolve({ propertyApplianceID: propertyApplianceID });
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
