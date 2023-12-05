import { getPropertyByID } from "../commands/properties.js";

export const getPropertyByIDRoute = {
  path: "/api/properties/:propertyID",
  method: "get",
  handler: async (req, res) => {
    console.log("Route gets called.");

    let propertyID = req.params.propertyID;
    console.log(propertyID);
    const propertyResult = await getPropertyByID(propertyID); 
    console.log(propertyResult)
    res.status(200).json({ propertyResult });
  },
};