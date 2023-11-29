import { updateTask } from "../commands/tasks.js";

export const addTask = {
    path: "/api/updateTask",
    method: "post",
    handler: async (req, res) => {

        const { taskID } = req.body;

        const taskResult = await updateTask(taskID);

        const { message } = taskResult;

        res.status(200).json({
            message: message
        });
    }
};