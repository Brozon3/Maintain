import { callAddAppliance } from "../commands/appliances.js";

export const addApplianceRoute = {
  path: "/api/addAppliance",
  method: "post",
  handler: async (req, res) => {
    const { user, propertyID, data } = req.body;

    const applianceResult = await callAddAppliance(
      user.userID,
      propertyID,
      data
    );

    console.log(applianceResult);

    res.status(200).json({ message: "All good." });
  },
};
