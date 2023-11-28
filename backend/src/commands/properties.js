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
  const { address, city, prov, type, roof, carpet, pets, heating } =
    propertyObject;
  return new Promise((resolve, reject) => {
    try {
      const sql =
        "CALL Maintain_Database.add_property(?, ?, ?, ?, ?, ?, ?, ?, ?, @propertyID_res, @message_res)";
      conn.query(
        sql,
        [userID, address, city, prov, carpet, heating, pets, type, roof],
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
          resolve(result[0]);
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

// export const deleteProperty = async (propertyObject) => {
//   const { propertyID } = propertyObject;

//   return new Promise((resolve, reject) => {
//     try {
//       const sql = `DELETE FROM Maintain_Database.properties WHERE propertyID = ?`;

//       conn.query(sql, [parseInt(propertyID)], function (err, result) {
//         if (err) {
//           console.error("Error deleting Property: ", err);
//           reject(err);
//         } else {
//           if (result.affectedRows > 0) {
//             console.log("Property deleted successfully.");
//             resolve(result);
//           } else {
//             console.log("Property not found.");
//             resolve(null);
//           }
//         }
//       });
//     } catch (error) {
//       console.error("Error connecting to the database: ", error);
//       reject(error);
//     }
//   });
// };

// export const dissociateUserProperty = async (propertyObject) => {
//   const { propertyID } = propertyObject;

//   return new Promise((resolve, reject) => {
//     try {
//       const sql =
//         "DELETE FROM Maintain_Database.userProperty WHERE propertyID = ?";

//       conn.query(sql, [parseInt(propertyID)], function (err, result) {
//         if (err) {
//           console.error("Error deleting property:", err);
//           reject(err);
//         } else {
//           if (result.affectedRows > 0) {
//             console.log("Property dissociation complete.");
//             resolve(result);
//           } else {
//             console.log("User property association not found.");
//             resolve(null);
//           }
//         }
//       });
//     } catch (error) {
//       console.error("Error connecting to the database: ", error);
//       reject(error);
//     }
//   });
// };

// export const insertProperty = async (propertyObject) => {
//   const { address, city, prov, type, roof, carpet, pets, heatingType } =
//     propertyObject;
//   return new Promise((resolve, reject) => {
//     try {
//       const checkIfExistsSql =
//         "SELECT * FROM Maintain_Database.properties WHERE address = ? AND city = ? AND prov = ?";
//       conn.query(
//         checkIfExistsSql,
//         [address, city, prov],
//         function (err, result) {
//           if (err) {
//             console.error("Error checking for existing properties", err);
//             reject(err);
//           } else {
//             if (result.length > 0) {
//               resolve(null);
//             } else {
//               const sql =
//                 "INSERT INTO Maintain_Database.properties (address, city, prov, type ,roof, carpet, pets, heating) VALUES (?,?,?,?,?,?,?,?)";
//               conn.query(
//                 sql,
//                 [address, city, prov, type, roof, carpet, pets, heatingType],
//                 function (err, result) {
//                   if (err) {
//                     console.error("Error inserting property:", err);
//                     reject(err);
//                   } else {
//                     console.log("Property inserted successfully");
//                     resolve(result);
//                   }
//                 }
//               );
//             }
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error connecting to the database:", error);
//       reject(error);
//     }
//   });
// };
// export const insertProperty = async (propertyObject) => {
//   const today = new Date();
//   const dateString =
//     today.getFullYear().toString() +
//     "-" +
//     (today.getMonth() + 1).toString() +
//     "-" +
//     today.getDate().toString();
//   const { address, city, prov, type, roof, carpet, pets, heating } =
//     propertyObject;
//   return new Promise((resolve, reject) => {
//     try {
//       const checkIfExistsSql =
//         "SELECT * FROM Maintain_Database.properties WHERE address = ? AND city = ? AND prov = ?";
//       conn.query(
//         checkIfExistsSql,
//         [address, city, prov],
//         function (err, result) {
//           if (err) {
//             console.error("Error checking for existing properties", err);
//             reject(err);
//           } else {
//             if (result.length > 0) {
//               resolve(null);
//             } else {
//               const sql =
//                 "INSERT INTO Maintain_Database.properties (address, city, prov, type ,roof, carpet, pets, heating, date_added) VALUES (?,?,?,?,?,?,?,?,?)";
//               conn.query(
//                 sql,
//                 [
//                   address,
//                   city,
//                   prov,
//                   type,
//                   roof,
//                   carpet,
//                   pets,
//                   heating,
//                   dateString,
//                 ],
//                 function (err, result) {
//                   if (err) {
//                     console.error("Error inserting property:", err);
//                     reject(err);
//                   } else {
//                     console.log("Property inserted successfully");
//                     resolve(result);
//                   }
//                 }
//               );
//             }
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error connecting to the database:", error);
//       reject(error);
//     }
//   });
// };

// export const associateProperty = async (propertyObject) => {
//   const { user, propertyId } = propertyObject;
//   return new Promise((resolve, reject) => {
//     try {
//       const sql =
//         "INSERT INTO Maintain_Database.userProperty (userID, propertyID) VALUES (?,?)";

//       conn.query(sql, [user.userID, propertyId], function (err, result) {
//         if (err) {
//           console.error("Error inserting property:", err);
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     } catch (error) {
//       console.error("Error connecting to the database: ", error);
//       reject(error);
//     }
//   });
// };

export const getPropertyTasks = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.propertyTaskView WHERE propertyID = ?`;

      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting Tasks: ", err);
          reject(err);
        } else {
          console.log("Successfully got Tasks.");
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
      const sql = `SELECT taskID FROM Maintain_Database.propertyTasks WHERE 
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

export const getPropertyAppliances = async (propertyID) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM Maintain_Database.applianceView WHERE 
      propertyID = ?`;
      console.log(sql);
      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting Property Appliances: ", err);
          reject(err);
        } else {
          console.log("Successfully got property appliances.");
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
      const sql = "SELECT * FROM Maintain_Database.propertyTaskView WHERE propertyID = ?"
      conn.query(sql, [propertyID], function (err, result) {
        if (err) {
          console.error("Error getting property tasks: ", err)
          reject(err);
        } else {
          console.log("Succesfully got property tasks.")
          resolve(result);
        }
      })
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      reject(error);
    }
  });
};
