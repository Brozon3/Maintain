import { getPropertyFeatures } from "../commands/properties.js";

export const getPropertyFeaturesRoute = {
  path: "/api/propertyFeatures/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const getFeatures = await getPropertyFeatures(id);
    if (getFeatures.length > 0) {
      res.status(200).json({ getFeatures });
    } else {
      res.status(200).json({ message: "No features in list." });
    }
  }
};