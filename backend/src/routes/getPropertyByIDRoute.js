import dotenv from "dotenv";
dotenv.config();
import { getPropertyByID } from "../commands/properties.js";

export const getPropertyByIDRoute = {
  path: "/api/properties/:id",
  method: "get",
  handler: async (req, res) => {
    let id = req.params.id;
    const propertyResult = await getPropertyByID(id);
    res.status(200).json({ propertyResult });
  },
};