const express = require("express");

const PORT = process.env.PORT || 8888;
const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Home Page</h2");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
