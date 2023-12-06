import {
  getUserByEmail,
  updateGoogleUser,
  insertNewUser,
} from "../commands/users.js";

//Updates or creates user in the database
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
    const max_properties = 3;
    const result = await insertNewUser({
      id,
      email,
      is_verified,
      max_properties,
    });
    return result;
  }
};
