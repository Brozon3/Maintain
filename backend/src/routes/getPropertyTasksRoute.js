import dotenv from "dotenv";
dotenv.config();
import { getPropertyTasks } from "../commands/properties.js";
import { getTasksByIDs } from "../commands/tasks.js"

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    
    const result = await getPropertyTasks(id);
    if (result) {
      console.log(result);
      res.status(200).json({ message: "Tasks in list." });
    } else {
      res.status(200).json({ message: "No tasks in list." });
    }
    // 
    
  },
};