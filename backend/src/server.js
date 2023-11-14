import express from "express";
import { routes } from "./routes/index.js";
const app = express();
import {
  getAllFeatures,
  insertFeature,
  deleteSingleFeatureById,
} from "./commands/features.js";
import {
  getAllProperties,
  getSinglePropertyByID,
  insertProperty,
  deleteSinglePropertyById,
} from "./commands/properties.js";
import {
  getAllTasks,
  insertTask,
  deleteSingleTaskById,
} from "./commands/tasks.js";
import {
  getAllUsers,
  getUserByEmail,
  insertUser,
  deleteSingleUserById,
  updateGoogleUser,
  verifyUser,
} from "./commands/users.js";

const port = 8000;

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin; same-origin-allow-popups"
  );
  next();
});

app.use(express.json());

// Add the routes stores in the routes/index.js folder
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

app.get("/api/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}!!`);
});

//Database format
// {"id": 4, "color":"Green", "name":"This is a real street"}

// const TABLE_NAME = "users";

//Features Section
app.get("/features/", async (req, res) => {
  console.log("hit");
  try {
    const properties = await getAllFeatures();
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.post("/features/", async (req, res) => {
  const body = req.body;
  try {
    const newFeature = await insertFeature(body);
    console.log("newFeature", newFeature);
    res.status(200).json(body);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.delete("/features/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  try {
    const feature = await deleteSingleFeatureById(id);
    res.status(200).json(feature);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

//Users Section
//Get all the users
app.get("/users/", async (req, res) => {
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

//Get user by email. Email is a global secondary index in AWS
app.get("/users/:email", async (req, res) => {
  let email = req.params.email;

  try {
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    console.log("Cannot find user.");
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

// Add a new user
app.post("/users/", async (req, res) => {
  const body = req.body;
  try {
    const newUser = await insertUser(body);
    console.log("newUser", newUser);
    res.status(200).json(body);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.delete("/users/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  try {
    const user = await deleteSingleUserById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

// Properties Section
//Get all the properties
app.get("/properties/", async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

// use postman to add a new property
app.post("/properties/", async (req, res) => {
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

// Either run database or run postman to get the property
app.get("/properties/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);

  try {
    const property = await getSinglePropertyByID(id);
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    console.log("Is this an int: " + Number.isInteger(id));
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

// Use postman to delete a single item by id
app.delete("/properties/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  try {
    const property = await deleteSinglePropertyById(id);
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Tasks section

app.get("/tasks/", async (req, res) => {
  console.log("hit");
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.post("/tasks/", async (req, res) => {
  const body = req.body;
  try {
    const newTask = await insertTask(body);
    console.log("newTask", newTask);
    res.status(200).json(body);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  try {
    const task = await deleteSingleTaskById(id);
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  }
});
