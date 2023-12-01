import dotenv from "dotenv";
dotenv.config();
import { getPropertyAppliances } from "../commands/properties.js";

export const getPropertyAppliancesRoute = {
  path: "/api/propertyAppliances/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const getAppliances = await getPropertyAppliances(id);
    if (getAppliances.length > 0) {
      res.status(200).json({ getAppliances });
    } else {
      res.status(200).json({ message: "No appliances in list." });
    }
  }
};