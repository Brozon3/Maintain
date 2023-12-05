import { callAddProperty } from "../commands/properties.js";

export const addProperty = {
  path: "/api/addProperty",
  method: "post",
  handler: async (req, res) => {
    const { user, data } = req.body;

    const propertyResult = await callAddProperty(user.userID, data);

    const { propertyID, message } = propertyResult;

    res.status(200).json({
      propertyID: propertyID,
      message: message,
    });
  },
};
