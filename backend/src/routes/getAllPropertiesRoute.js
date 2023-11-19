import dotenv from "dotenv";
dotenv.config();
import { getAllProperties } from "../commands/properties.js";

export const getAllPropertiesRoute = {
  path: "/api/properties/",
  method: "get",
  handler: async (req, res) => {
    const propertyResult = await getAllProperties();
    res.status(200).json({ propertyResult });
  },
};
