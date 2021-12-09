const { Sequelize, DataTypes } = require("sequelize");

///////////////////////////////
// USER MODEL
///////////////////////////////
const sequelize = new Sequelize("mysql::memory:");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});