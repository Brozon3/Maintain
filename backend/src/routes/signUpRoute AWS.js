import jwt from "jsonwebtoken";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";
// We will need to have this database connection once we have a database to connect to
import { connectToDb } from "../db.js";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      // Can add more attributes later. Must also be set up in Cognito
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Unable to sign up user" });
        }

        // Rename this one based on actual database setup.
        const db = connectToDb("Maintain");

        // Video specific
        const startingInfo = {
          hairColor: "",
          favoriteFood: "",
          bio: "",
        };

        // Insert data of new user into database
        const result = await db.collection("users").insertOne({
          email,
          info: startingInfo,
        });
        const { insertedId } = result;

        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
