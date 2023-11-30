import dotenv from "dotenv";
dotenv.config();
import { getPropertyByID } from "../commands/properties.js";

export const getPropertyByIDRoute = {
  path: "/api/properties/:propertyID",
  method: "get",
  handler: async (req, res) => {
    let propertyID = req.params.propertyID;
    const propertyResult = await getPropertyByID(propertyID); 
    res.status(200).json({ propertyResult });
  },
};