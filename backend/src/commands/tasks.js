import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

export const getAllTasks = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.tasks`;

      conn.query(sql, function (err, result) {
        if (err) {
          console.error("Error getting tasks: ", err);
          reject(err);
        } else {
          console.log("Successfully got all tasks.")
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const insertTask = async (userObject) => {
  const { description, recurring, frequency, completeBy, completedOn } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `INSERT INTO Maintain_Database.tasks 
      (description, recurring, frequency, completeBy, completedOn) 
      Values (?, ?, ?, ?, ?)`;

      conn.query(sql, [description, recurring, frequency, completeBy, completedOn], function (err, result) {
        if (err) {
          console.error("Error inserting task: ", err);
          reject(err);
        } else {
          console.log("Task inserted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const deleteTask = async (userObject) => {
  const { taskID } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM Maintain_Database.tasks WHERE (taskID) = ?`;

      conn.query(sql, [taskID], function (err, result) {
        if (err) {
          console.error("Error deleting task: ", err);
          reject(err);
        } else {
          console.log("Task deleted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}

export const updateTask = async (userObject) => {
  const { completedOn, taskID } = userObject;
  return new Promise((resolve, reject) => {
    try {
      const sql = `Update Maintain_Database.tasks SET completedOn = ? WHERE taskID = ?`;

      conn.query(sql, [completedOn, taskID ], function (err, result) {
        if (err) {
          console.error("Error deleting task: ", err);
          reject(err);
        } else {
          console.log("Task deleted successfully.");
          resolve(result);
        }
      });
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
}