import dotenv from "dotenv";
dotenv.config();
import { getPropertyTasks } from "../commands/properties.js";

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const propertyTasks = await getPropertyTasks(id);
    const property = {
      address: propertyTasks[0].address,
      prov: propertyTasks[0].prov
    }
    if (propertyTasks.length > 0) {
      const tasks = propertyTasks.map((result) => [result.description, result.dueDate]);
      res.status(200).json({ property, tasks});
    } else {
      res.status(200).json({ message: "No tasks in list." });
    }
    // 
    
  },
};
