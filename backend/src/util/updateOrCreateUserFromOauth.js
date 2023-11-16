import {
  getUserByEmail,
  updateGoogleUser,
  insertNewUser,
} from "../commands/users.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id, verified_email: isVerified, email } = oauthUserInfo;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const { userID } = existingUser;
    const result = await updateGoogleUser({ oauthUserInfo });
    return result;
  } else {
    const userID = parseInt(id);
    const result = await insertNewUser({
      userID,
      email,
      isVerified,
    });
    return result;
  }
};
