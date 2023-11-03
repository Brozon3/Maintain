import express from "express";

const app = express();
app.use(express.json());

app.get("/api/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}!!`);
});

app.post("/api/hello", (req, res) => {
  res.send(`Hello ${req.body.name}!`);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
