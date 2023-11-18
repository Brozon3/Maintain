import {
  getUserByEmail,
  updateGoogleUser,
  insertUser,
} from "../commands/users.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id, verified_email: is_verified, email, name } = oauthUserInfo;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const { userID, max_properties } = existingUser[0];
    const result = await updateGoogleUser({
      userID,
      email,
      is_verified,
      max_properties,
      name,
    });
    return result;
  } else {
    // const userID = parseInt(id);
    const result = await insertNewUser({
      id,
      email,
      isVerified,
    });
    return result;
  }
};
