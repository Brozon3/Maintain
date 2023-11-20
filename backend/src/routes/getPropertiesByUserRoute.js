import dotenv from "dotenv";
dotenv.config();
import { getPropertyIdsByUser } from "../commands/users.js";
import { getPropertiesByIDs } from "../commands/properties.js";

export const getPropertiesByUser = {
  path: "/api/users/:userID",
  method: "get",
  handler: async (req, res) => {
    let userID = req.params.userID;
    const propertyResults = await getPropertyIdsByUser(userID);
    const propertyIds = propertyResults.map((result) => result.propertyID);
    const userProperties = await getPropertiesByIDs(propertyIds);
    res.status(200).json({ userProperties });
  },
};
