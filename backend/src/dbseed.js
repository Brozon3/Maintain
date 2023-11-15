import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD
})

conn.connect(function(err) {
  if (err) throw err;

  conn.query('CREATE DATABASE IF NOT EXISTS main;');
  conn.query('USE main;');
  conn.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
      console.log(result);
  });
  conn.end();
});