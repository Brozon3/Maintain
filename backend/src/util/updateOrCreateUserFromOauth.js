import { getUserByEmail, updateGoogleUser, insertUser } from "../Commands.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const result = await updateGoogleUser(oauthUserInfo);
    return result.value;
  } else {
    const result = await insertUser({
      email,
      googleId,
      isVerified,
    });
    return result.ops[0];
  }
};
