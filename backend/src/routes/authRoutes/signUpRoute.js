import jwt from "jsonwebtoken";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../../util/awsUserPool.js";
import { insertNewUser, verifyUser } from "../../commands/users.js";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      // Can add more attributes later. Must also be set up in Cognito
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    //MAY NEED TO ADD PASSWORD VALIDATION??

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

        // Here's where we specify user starting info.
        // const startingInfo = {
        //   hairColor: "",
        //   favoriteFood: "",
        //   bio: "",
        // };

        const is_verified = false;
        // Insert data of new user into database.
        try {
          const result = await insertNewUser({
            email,
            is_verified,
          });
          const { userID } = result[0];

          jwt.sign(
            {
              userID,
              is_verified,
              email,
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
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    );
  },
};
