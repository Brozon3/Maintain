import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
import { getAllUsers } from "../commands/users.js";

const conn = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
});

export const getUsers = {
  path: "/api/users/",
  method: "get",
  handler: async (req, res) => {
    const propertyResult = await getAllUsers(data);
    res.status(200).json({ propertyResult });
  },
};