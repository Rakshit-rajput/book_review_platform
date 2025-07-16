const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.listen(PORT, () => {
  console.log("server is listening on localhost 5000");
});
