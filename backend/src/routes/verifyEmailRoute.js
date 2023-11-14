import jwt from "jsonwebtoken";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";

export const verifyEmailRoute = {
  path: "/api/verifyEmail",
  method: "put",
  handler: async (req, res) => {
    const { email, verificationString } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err)
          return res
            .status(401)
            .json({ message: "The verification code is incorrect." });
        const result = await verifyUser(email);
        const { userID, info } = result;

        jwt.sign(
          { id, email, isVerified: true, info },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
