export const addTask = {
    path: "/api/addTask",
    method: "post",
    handler: async (req, res) => {
        const { property, data } = req.body;

        const taskResult = await callAddTask(property, data);

        const { taskID, message } = taskResult;

        res.stats(200).json({
            taskID: taskID,
            message: message
        });
    }
};