import { getPropertyIdsByUser } from "../commands/users.js";
import { getPropertiesByIDs } from "../commands/properties.js";

export const getPropertiesByUser = {
  path: "/api/getUserProperties/:userID",
  method: "get",
  handler: async (req, res) => {
    let userID = req.params.userID;
    const propertyResults = await getPropertyIdsByUser(userID);
    if (propertyResults.length > 0) {
      const propertyIds = propertyResults.map((result) => result.propertyID);
      const userProperties = await getPropertiesByIDs(propertyIds);
      res.status(200).json({ userProperties });
    } else {
      res.status(200).json({ message: "User has no properties" });
    }
  },
};
