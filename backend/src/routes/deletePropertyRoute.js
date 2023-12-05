import { callRemoveProperty } from "../commands/properties.js";

export const deleteUserProperty = {
  path: "/api/deleteProperty/",
  method: "delete",
  handler: async (req, res) => {
    const { propertyID } = req.body;

    const response = await callRemoveProperty({ propertyID });

    res.status(200).json({ message: response });
  },
};
