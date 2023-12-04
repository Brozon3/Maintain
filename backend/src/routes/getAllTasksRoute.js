import dotenv from "dotenv";
dotenv.config();
import { callPropertyTaskView } from "../commands/tasks.js";

export const getAllTasksRoute = {
  path: "/api/appliances/",
  method: "get",
  handler: async (req, res) => {
    const taskResult = await callPropertyTaskView();
    res.status(200).json({ taskResult });
  },
};