import { getPropertyByID } from "../commands/properties.js";

export const getPropertyByIDRoute = {
  path: "/api/properties/:propertyID",
  method: "get",
  handler: async (req, res) => {

    let propertyID = req.params.propertyID;
    const propertyResult = await getPropertyByID(propertyID); 
    const { propID, address, city, prov } = propertyResult;
    res.status(200).json( {propertyID: propID, address, city, prov} );
  },
};