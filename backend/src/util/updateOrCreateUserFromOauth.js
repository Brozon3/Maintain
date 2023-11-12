import { getUserByEmail } from "../Commands.js";

export const updateOrCreateUserFromOauth = async({ oauthUserInfo });
const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

const existingUser = await getUserByEmail(email);

if (existingUser) {
  // const result = await UPDATE USER COMMAND
}
