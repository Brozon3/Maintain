import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const getAllUsers = {
  path: "/api/users",
  method: "get",
  handler: (req, res) => {
    conn.connect(function (err) {
      conn.query(
        `SELECT * FROM Maintain_Database.users`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  },
};

export const insertOneUser = {
  path: "/api/users",
  method: "post",
  handler: (req, res) => {
    if (req.query.email) {
      console.log("Request received");
      conn.connect(function (err) {
        conn.query(
          `INSERT INTO Maintain_Database.users (email) VALUES ('${req.query.email}')`,
          function (err, result, fields) {
            if (err) res.send(err);
            if (result) res.send({ email: req.query.email });
            if (fields) console.log(fields);
          }
        );
      });
    } else {
      console.log("Missing a parameter");
    }
  },
};

export const insertNewUser = {
  path: "/api/newUser",
  method: "post",
  handler: (req, res) => {
    const { email, is_verified, password_hash, verification_string } = req.body;

    console.log("Request received");
    conn.connect(function (err) {
      conn.query(
        `INSERT INTO Maintain_Database.users (email, is_verified, password_hash, verification_string) VALUES ('${email}', '${is_verified}', '${password_hash}', '${verification_string}')`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result)
            res.send({
              email,
              is_verified,
              password_hash,
              verification_string,
            });
          if (fields) console.log(fields);
        }
      );
    });
  },
};

// app.get('/users', (req, res) => {
//   conn.connect(function(err) {
//       conn.query(`SELECT * FROM Maintain_Database.users`, function(err, result, fields) {
//           if (err) res.send(err);
//           if (result) res.send(result);
//       });
//   });
// });

// app.post('/users', (req, res) => {
//   if (req.query.username && req.query.email && req.query.age) {
//       console.log('Request received');
//       conn.connect(function(err) {
//           conn.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
//               if (err) res.send(err);
//               if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
//               if (fields) console.log(fields);
//           });
//       });
//   } else {
//       console.log('Missing a parameter');
//   }
// });
