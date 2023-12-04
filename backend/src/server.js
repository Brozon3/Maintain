import express from "express";
import { routes } from "./routes/index.js";
import { getPropertyByID } from "./commands/properties.js";

const app = express();

const port = 8000;

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin; same-origin-allow-popups"
  );
  next();
});

app.use(express.json());

app.get("/api/properties/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);

  try {
    const property = await getPropertyByID(id);
    res.status(200).json(property);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
