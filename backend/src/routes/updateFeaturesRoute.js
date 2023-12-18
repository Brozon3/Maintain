import { callUpdateFeatures } from "../commands/features.js"

export const updateFeaturesRoute = {
  path: "/api/updateFeatures",
  method: "post",
  handler: async (req, res) => {
    const { features, propertyID } = req.body;

    const featuresResult = await callUpdateFeatures(features, propertyID);

    console.log(featuresResult[0]);

    res.status(200).json({
      message: "All good."
    });
  }
};