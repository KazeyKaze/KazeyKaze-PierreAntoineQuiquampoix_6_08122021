const db = require("../config/database");
const DataTypes = require("sequelize");

///////////////////////////////
// COMMENT MODEL
///////////////////////////////
const Comment = db.define("Comment", {
  text: {
    type: DataTypes.TEXT,
  },
});

module.exports = Comment;
