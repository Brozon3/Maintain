import jwt from "jsonwebtoken";
// import { awsUserPool } from "../util/awsUserPool.js";
import bcrypt from "bcrypt";
// We will need to have this database connection once we have a database to connect to
import { connectToDb } from "../db.js";
// import { DocumentClient } from "../Commands"

// Temp import for basic setup. Remove bcrypt from dependencies when finished

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = connectToDb;
    const user = await db.collection("users").findOne({ email });

    // const params = {
    //   TableName: 'users',
    //   Key: {
    //     email,
    //   }
    // }
    // const user = await DocumentClient.get(params).promise

    if (user) {
      return res.status(409).json({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "test",
      favoriteFood: "test",
      bio: "test",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });

    const { insertedId } = result;

    console.log({
      id: insertedId,
      email,
      info: startingInfo,
      isVerified: false,
    });

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
