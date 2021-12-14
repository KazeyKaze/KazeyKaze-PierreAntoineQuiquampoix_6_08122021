const Sequelize = require("sequelize");

///////////////////////////////
// MYSQL CONNECTION
///////////////////////////////
const db = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    logging: false,
    dialect: "mysql",
    host: "localhost",

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = db;
