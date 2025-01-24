const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Message from ServerRPi");
});

app.listen(port, () => {
  console.log(`ServerRPi is listening on port ${port}`);
});
