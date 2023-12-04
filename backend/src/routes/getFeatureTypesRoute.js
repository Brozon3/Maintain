import { getFeatureTypes } from "../commands/features.js";

export const getFeatureTypesRoute = {
  path: "/api/featureTypes",
  method: "get",
  handler: async (req, res) => {
    const result = await getFeatureTypes();
    const featureTypes = result.map((featureType) => featureType.featureType);
    res.status(200).json({featureTypes});
  }
};