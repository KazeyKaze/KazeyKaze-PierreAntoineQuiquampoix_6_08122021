const express = require("express");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const initdb = require("./models/index");

const app = express();

///////////////////////////////
// CORS
///////////////////////////////
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

///////////////////////////////
// RATE LIMIT
///////////////////////////////
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

initdb()
  .then(() => {
    app.use(express.json());
    app.use("/images", express.static(path.join(__dirname, "images")));
    app.use("/api/posts", postRoutes);
    app.use("/api/auth", userRoutes);
    app.use(helmet());
    app.use(limiter);

    console.log("Connection to the database MySQL established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database MySQL:", err);
  });

module.exports = app;
