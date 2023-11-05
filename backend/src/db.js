import { MongoClient } from "mongodb";
import "dotenv/config";

let connectToDb;

async function getDbConnection(cb) {
  const client = new MongoClient(process.env.MONGO_CONNECT, {
    tls: true,
  });
  await client.connect();

  //set name of database
  connectToDb = client.db("Maintain");
  cb();
}

export { connectToDb, getDbConnection };
