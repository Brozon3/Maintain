import express from "express";
const app = express();
const AWS = require('aws-sdk');
require('dotenv').config();

const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'properties';

AWS.config.update({ region: 'us-east-1' })



const port = 3000;

app.use(express.json());

app.get("/rows/all", (req, res) => {
  var params = {
      TableName: tableName
  };

  client.scan(params, (err, data) => {
      if (err) {
          console.log(err);
      } else {
          var items = [];
          for (var i in data.Items)
              items.push(data.Items[i]['Name']);

          res.contentType = 'application/json';
          res.send(items);
      }
  });
});

app.get("/api/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}!!`);
});

app.post("/api/hello", (req, res) => {
  res.send(`Hello ${req.body.name}!`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
