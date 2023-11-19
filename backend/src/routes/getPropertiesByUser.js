import dotenv from "dotenv";
dotenv.config();
import { getPropertiesByUser } from "../commands/users.js";

export const getPropertiesByUserRoute = {
  path: "/api/users/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const propertyResult = await getPropertiesByUser(id);
    res.status(200).json({ propertyResult });
  },
};