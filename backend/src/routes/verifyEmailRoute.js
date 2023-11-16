import jwt from "jsonwebtoken";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";
import { verifyUser } from "../commands/users.js";

export const verifyEmailRoute = {
  path: "/api/verifyEmail",
  method: "put",
  handler: async (req, res) => {
    const { email: reqEmail, verificationString } = req.body;

    new CognitoUser({
      Username: reqEmail,
      Pool: awsUserPool,
    }).confirmRegistration(verificationString, true, async (err) => {
      if (err)
        return res
          .status(401)
          .json({ message: "The verification code is incorrect." });
      const result = await verifyUser(reqEmail);
      const { userID, email: resEmail, isVerified, max_properties } = result;

      jwt.sign(
        { userID, email: resEmail, isVerified, max_properties },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) return res.sendStatus(500);
          res.status(200).json({ token });
        }
      );
    });
  },
};
