import dotenv from "dotenv";
dotenv.config();
import { getPropertyTaskIDs } from "../commands/properties.js";

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const PropertyTasks = await getPropertyTaskIDs(id);
    res.status(200).json({ PropertyTasks });
  },
};