import express from "express";
import { routes } from "./routes/index.js";

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

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

app.listen(port, () => {
  console.log(`Maintain is listening on port ${port}`);
});
