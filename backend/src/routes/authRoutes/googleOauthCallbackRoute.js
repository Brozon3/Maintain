import jwt from "jsonwebtoken";
import { getGoogleUser } from "../../util/getGoogleUser.js";
import { updateOrCreateUserFromOauth } from "../../util/updateOrCreateUserFromOauth.js";

export const googleOauthCallbackRoute = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;
    const oauthUserInfo = await getGoogleUser({ code });
    const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });

    const { userID, email, is_verified, max_properties, name } = updatedUser;

    // const { verified_email: is_verified, email, name } = oauthUserInfo;

    jwt.sign(
      { userID, is_verified, email, name, max_properties },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.redirect(`http://localhost:3000/loginPage?token=${token}`);
      }
    );
  },
};
