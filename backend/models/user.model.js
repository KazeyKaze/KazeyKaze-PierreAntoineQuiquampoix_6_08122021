const { Sequelize, DataTypes } = require("sequelize");

///////////////////////////////
// USER MODEL
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

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

User.sync({ force: true }).then(() => {
  return User.create({
    firstName: "Pierre-Antoine",
    lastName: "Quiquampoix",
  });
});
