import { callRemoveAppliance } from "../commands/appliances.js";

export const deleteApplianceRoute = {
  path: "/api/deleteAppliance",
  method: "delete",
  handler: async (req, res) => {
    const { applianceID, propertyApplianceID } = req.body;
    
    console.log(applianceID, propertyApplianceID);

    const response = await callRemoveAppliance(applianceID, propertyApplianceID);

    console.log(response);

    //res.status(200).json({ message: "All good."});
  },
};