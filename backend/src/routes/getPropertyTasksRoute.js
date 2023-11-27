import dotenv from "dotenv";
dotenv.config();
import {
  getPropertyTaskIDs,
  getPropertyTasks,
} from "../commands/properties.js";
import { getTasksByIDs } from "../commands/tasks.js";

export const getPropertyTasksRoute = {
  path: "/api/propertyTasks/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;

    const propertyTasks = await getPropertyTasks(id);
    if (propertyTasks.length > 0) {
      res.status(200).json({ propertyTasks });
    } else {
      res.status(200).json({ message: "No tasks in list." });
    }

    // const getTaskIDs = await getPropertyTaskIDs(id);
    // if (getTaskIDs.length > 0) {
    // const tasks = getTaskIDs.map((result) => result.taskID);
    // const taskIDs = await getTasksByIDs(tasks);
    // res.status(200).json({ taskIDs });

    // } else {
    //   res.status(200).json({ message: "No tasks in list." });
    // }
    //
  },
};
