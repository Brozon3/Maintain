import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../../util/awsUserPool.js";

export const forgotPasswordRoute = {
  path: "/api/forgotPassword/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;

    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        res.sendStatus(200);
      },
      onFailure: (e) => {
        res.status(500).send({
          message: e.message,
          errorCode: e.code,
        });
      },
    });
  },
};
