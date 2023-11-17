import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../commands/users.js";
import { insertProperty, associateProperty } from "../commands/properties.js";

export const addProperty = {
  path: "/api/addProperty",
  method: "post",
  handler: async (req, res) => {
    const { user, data } = req.body;
    const { address, city, province, type, roof, carpet, pets, heatingType } =
      data;

    const propertyResult = await insertProperty(data);

    const userPropertyResult = await associateProperty({
      user: user,
      propertyId: propertyResult.insertId,
    });

    res.status(200).json({ propertyId });
  },
};
