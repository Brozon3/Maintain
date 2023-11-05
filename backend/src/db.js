import { MongoClient } from "mongodb";
import "dotenv/config";

let db;

async function getDbConnection(cb) {
  const client = new MongoClient(process.env.MONGO_CONNECT, {
    tls: true,
  });
  await client.connect();
  //set name of database
  db = client.db("Maintain");
  cb();
}

export { db, getDbConnection };
