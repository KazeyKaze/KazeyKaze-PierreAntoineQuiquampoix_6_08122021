const Post = require("./post.model");
const User = require("./user.model");
const Comment = require("./comment.model");

const initdb = async () => {
  await Post.belongsTo(User, { onDelete: "cascade" });
  await Post.hasMany(Comment);
  await Comment.belongsTo(User, { onDelete: "cascade" });

  await Post.sync({ alter: true });
  await User.sync({ alter: true });
  await Comment.sync({ alter: true });
};

module.exports = initdb;
