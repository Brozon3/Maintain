import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const callInsertEventID = async (entryID, eventID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "CALL Maintain_Database.insertEventId(?, ?)";
      conn.query(sql, [
        entryID,
        eventID,
        function (err, result) {
          if (err) {
            console.error("Error adding eventID", err);
            reject(err);
          } else {
            const responseParams = "SELECT @message_res AS message_res";
            conn.query(responseParams, function (err, outputResult) {
              if (err) {
                console.error("Message:", err);
                reject(err);
              } else {
                const message = outputResult[0].message_res;
                console.log("Message:", message);
                resolve({ message: message });
              }
            });
          }
        },
      ]);
    } catch (error) {
      console.error("Error connecting to the database:", error);
      reject(error);
    }
  });
};

export const callAddTask = async (userID, propertyID, taskObject) => {
  const {
    description,
    dueDate,
    defaultDate,
    frequency,
    featureType,
    applianceType,
    propertyApplianceID,
    propertyFeaturesID,
    eventID,
  } = taskObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "CALL Maintain_Database.add_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message_res)";
      conn.query(
        sql,
        [
          description,
          dueDate,
          userID,
          defaultDate,
          frequency,
          featureType,
          applianceType,
          propertyID,
          propertyApplianceID,
          propertyFeaturesID,
          eventID,
        ],
        function (err, result) {
          if (err) {
            console.error("Error adding task", err);
            reject(err);
          } else {
            const responseParams = "SELECT @message_res AS message_res";
            conn.query(responseParams, function (err, outputResult) {
              if (err) {
                console.error("Error fetching output parameters:", err);
                reject(err);
              } else {
                const message = outputResult[0].message_res;
                console.log("Output parameters:", message);
                resolve({ message: message });
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

export const callPropertyTaskView = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.tasks`;

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting tasks: ", err);
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

export const callUpdateTask = async (entryID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `CALL Maintain_Database.complete_task(?)`;

      conn.query(sql, [entryID], function (err, result) {
        if (err) {
          console.error("Error completing task: ", err);
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
