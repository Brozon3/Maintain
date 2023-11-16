import express from "express";
import { routes } from "./routes/index.js";
const app = express();

import {
  getAllUsers,
  insertNewUser,
  updateGoogleUser,
} from "./commands/users.js";
import {
  getAllProperties,
  insertProperty,
  } from "./commands/properties.js";

const port = 8000;

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin; same-origin-allow-popups"
  );
  next();
});

app.use(express.json());

// Users Section
// Get all the users
app.get("/api/users/", async (req, res) => {
  console.log("hit");
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  try {
    const newProperty = await insertNewUser(body);
    console.log("newProperty", newProperty);
    res.status(200).json(body);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});



//Properties section
app.get("/api/properties", async (req, res) => {
  console.log("hit");
  try {
    const users = await getAllProperties();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.post("/api/properties", async (req, res) => {
  const body = req.body;
  try {
    const newProperty = await insertProperty(body);
    console.log("newProperty", newProperty);
    res.status(200).json(body);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});


// Add the routes stores in the routes/index.js folder
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

app.get("/api/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}!!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
