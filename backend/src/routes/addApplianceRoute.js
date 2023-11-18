import { insertAppliance, associateAppliance } from "../commands/appliances.js";

export const addProperty = {
  path: "/api/addAppliance",
  method: "post",
  handler: async (req, res) => {
    const { propertyID, data } = req.body;

    const applianceResult = await insertAppliance(data);
    const { insertId } = applianceResult;

    const propertyAppliancesResult = await associateAppliance({
      propertyID: propertyID,
      applianceID: insertId,
    });

    res.status(200).json({ insertId });
  },
};