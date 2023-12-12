import { google } from "googleapis";

export const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://maintain.lol/api/auth/google/callback"
);
