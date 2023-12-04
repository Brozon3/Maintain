import { callUpdateTask } from "../commands/tasks.js";

export const updateTaskRoute = {
    path: "/api/updateTask",
    method: "post",
    handler: async (req, res) => {

        const { entryID } = req.body;

        const taskResult = await callUpdateTask(entryID);

        console.log(taskResult[0]);

        res.status(200).json({
            message: "All good."
        });
    }
};