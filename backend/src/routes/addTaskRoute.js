import { populate } from "dotenv";
import { callAddTask } from "../commands/tasks.js";

export const addTask = {
    path: "/api/addTask",
    method: "post",
    handler: async (req, res) => {
        const { user, propertyID, data } = req.body;

        console.log(user, propertyID, data);

        const taskResult = await callAddTask(user.userID, propertyID, data);

        const { message } = taskResult;

        res.status(200).json({
            message: message
        });
    }
};