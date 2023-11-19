import dotenv from "dotenv";

dotenv.config();

export const oAuthConfig = {
  path: "/api/oAuthConfig",
  method: "get",
  handler: async (req, res) => {
    res.json({
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    });
  },
};
