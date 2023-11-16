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
        onSuccess: async (session) => {
          console.log("Auth Success");
          const idToken = session.getIdToken().getJwtToken();

          const user = await getUserByEmail(email);

          const { _id: id, isVerified } = user;

          jwt.sign(
            { idToken, id, isVerified, email },
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
      }
    );
  },
};
