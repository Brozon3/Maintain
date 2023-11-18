import dotenv from "dotenv";
dotenv.config();
import { deleteUser } from "../commands/users.js";

export const deleteUserRoute = {
  path: "/api/users",
  method: "delete",
  handler: async (req, res) => {
    const { userID } = req.body;

    const userResult = await deleteUser({userID});
    
    res.status(200).json({ userResult });
  },
};