import { deleteAppliance } from "../commands/appliances.js";

export const deleteAppliance = {
  path: "/api/deleteAppliance/",
  method: "delete",
  handler: async (req, res) => {
    const { applianceID } = req.body;

    const response = await deleteAppliance({ applianceID });

    res.status(200).json({ message: response });
  },
};