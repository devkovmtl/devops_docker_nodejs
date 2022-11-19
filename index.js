const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");

const {
  APP_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to db"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

let redisClient = createClient({
  legacyMode: true,
  host: REDIS_URL,
  port: REDIS_PORT,
});
redisClient.connect().catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: false,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true, // js on client can't access it
      maxAge: 30000,
    },
  })
);

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
