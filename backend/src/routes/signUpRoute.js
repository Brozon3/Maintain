import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail.js";
// import { awsUserPool } from "../util/awsUserPool.js";
import bcrypt from "bcrypt";
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

    const verificationString = uuid();

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
      verificationString,
    });

    const { insertedId } = result;

    try {
      await sendEmail({
        to: email,
        from: "saxdevchris@gmail.com",
        subject: "Please verify your email",
        text: `
      Thanks for signingup! To verify your mail, click here:
      http://localhost:3000/verify-email/${verificationString}
    `,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }

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
