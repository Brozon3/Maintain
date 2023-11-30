import { getApplianceTypes } from "../commands/appliances.js";

export const getApplianceTypesRoute = {
  path: "/api/applianceTypes",
  method: "get",
  handler: async (req, res) => {
    const result = await getApplianceTypes();
    const applianceTypes = result.map((applianceType) => applianceType.applianceType);
    console.log(applianceTypes);
    res.status(200).json({applianceTypes});
  }
}