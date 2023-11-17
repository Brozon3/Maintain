import jwt from "jsonwebtoken";
import { getUserByEmail } from "../commands/users.js";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          console.log("Auth Success");

          const idToken = result.getIdToken().getJwtToken();

          const userData = await getUserByEmail(email);

          const { userID, is_verified, max_properties } = userData[0];

          jwt.sign(
            { idToken, userID, is_verified, email },
            process.env.JWT_SECRET,
            { expiresIn: "2d" },
            (err, token) => {
              if (err) {
                res.sendStatus(500);
              }
              res.status(200).json({ token });
            }
          );
        },
        onFailure: (err) => {
          console.log("Auth Fail", err);
          res.sendStatus(401);
        },
        // This logic will need to be implemented later. Build a page for the user to create a new password (may not be necessary with hosted UI)
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          console.log(userAttributes);
        },
      }
    );
  },
};
