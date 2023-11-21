import dotenv from "dotenv";
dotenv.config();
import { deleteProperty } from "../commands/properties.js";
import { dissociateUserProperty } from "../commands/properties.js";

export const deleteUserProperty = {
  path: "/api/deleteProperty/",
  method: "delete",
  handler: async (req, res) => {
    const { propertyID } = req.body;

    const dissociateProperty = await dissociateUserProperty({ propertyID });
    const removeProperty = await deleteProperty({ propertyID });

    res
      .status(200)
      .json({ message: "Property deleted and association to user removed" });
  },
};
