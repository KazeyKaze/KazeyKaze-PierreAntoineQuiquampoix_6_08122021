const express = require("express");
const { Sequelize } = require("sequelize");
const saucesRoutes = require("./routes/sauce.routes");
const userRoutes = require("./routes/user.routes");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

///////////////////////////////
// MYSQL CONNECTION
///////////////////////////////
const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    dialect: "mysql",
    host: "localhost",

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database MySQL established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database MySQL:", err);
  });

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

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use(helmet());
app.use(limiter);

module.exports = app;
