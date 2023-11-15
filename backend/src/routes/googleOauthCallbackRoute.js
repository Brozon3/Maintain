import jwt from "jsonwebtoken";
import { getGoogleUser } from "../util/getGoogleUser.js";
import { updateOrCreateUserFromOauth } from "../util/updateOrCreateUserFromOauth.js";

export const googleOauthCallbackRoute = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;
    const oauthUserInfo = await getGoogleUser({ code });
    const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });

    const { userID, isVerified, email, name } = updatedUser;

    jwt.sign(
      { userID, isVerified, email, name },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.redirect(`http://localhost:3000/loginPage?token=${token}`);
      }
    );
  },
};
