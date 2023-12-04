import dotenv from "dotenv";
dotenv.config();
import { getPropertyTasks } from "../commands/properties.js";

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const propertyTasks = await getPropertyTasks(id);
    if (propertyTasks.length > 0) {
      const tasks = propertyTasks.map((result) => [result.description, result.dueDate, result.entryID]);
      res.status(200).json({ tasks});
    } else {
      res.status(200).json({ message: "No tasks in list." });
    }
    // 
    
  },
};
