import dotenv from "dotenv";
dotenv.config();
import { getPropertyTaskIDs } from "../commands/properties.js";
import { getTasksByIDs } from "../commands/tasks.js"

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const getTaskIDs = await getPropertyTaskIDs(id);
    if (getTaskIDs > 0) {
      const taskIDs = await getTasksByIDs(getTaskIDs);
      res.status(200).json({ taskIDs });
    }
    // 
    res.status(200).json({ message: "No tasks in list." });
  },
};