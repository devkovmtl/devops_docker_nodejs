const express = require("express");
const mongoose = require("mongoose");
const {
  APP_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("Successfully connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("<h2>Home Page</h2");
});

app.listen(APP_PORT, () => console.log(`listening on port ${APP_PORT}`));
