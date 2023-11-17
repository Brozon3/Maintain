import dotenv from "dotenv";
dotenv.config();
import { getAllUsers } from "../commands/users.js";

export const getAllUsersRoute = {
  path: "/api/users/",
  method: "get",
  handler: async (req, res) => {
    const propertyResult = await getAllUsers();
    res.status(200).json({ propertyResult });
  },
};