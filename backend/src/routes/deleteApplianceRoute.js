import { callRemoveAppliance } from "../commands/appliances.js";

export const deleteApplianceRoute = {
  path: "/api/deleteAppliance",
  method: "delete",
  handler: async (req, res) => {
    const { propertyApplianceID } = req.body;

    const response = await callRemoveAppliance(propertyApplianceID);

    res.status(200).json({ message: "All good." });
  },
};
