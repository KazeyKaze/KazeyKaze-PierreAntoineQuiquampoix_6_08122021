const db = require("../config/database");
const DataTypes = require("sequelize");

///////////////////////////////
// POST MODEL
///////////////////////////////
const Post = db.define("Post", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
