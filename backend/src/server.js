import express from "express";
import 'dotenv/config';
import path from "path";
import { routes } from "./routes/index.js";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin; same-origin-allow-popups"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Maintain is listening on port ${PORT}`);
});
