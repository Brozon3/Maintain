import dotenv from "dotenv";
dotenv.config();
import { getAllAppliances } from "../commands/appliances.js";

export const getAllAppliancesRoute = {
  path: "/api/appliances/",
  method: "get",
  handler: async (req, res) => {
    const applianceResult = await getAllAppliances();
    res.status(200).json({ applianceResult });
  },
};