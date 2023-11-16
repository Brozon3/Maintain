import express from "express";
const app = express();

import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})


app.use(express.json());

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post('/users', (req, res) => {
  if (req.query.username && req.query.email && req.query.age) {
      console.log('Request received');
      conn.connect(function(err) {
          conn.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
              if (fields) console.log(fields);
          });
      });
  } else {
      console.log('Missing a parameter');
  }
});

app.get('/users', (req, res) => {
  conn.connect(function(err) {
      conn.query(`SELECT * FROM main.users`, function(err, result, fields) {
          if (err) res.send(err);
          if (result) res.send(result);
      });
  });
});