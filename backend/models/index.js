const Post = require("./post.model");
const User = require("./user.model");
const Comment = require("./comment.model");
const { FOREIGNKEYS } = require("sequelize/dist/lib/query-types");

const initdb = async () => {
  await User.hasMany(Post, { onDelete: "cascade", onUpdate: "cascade" });
  await Post.belongsTo(User);

  await User.hasMany(Comment, { onDelete: "cascade", onUpdate: "cascade" });
  await Comment.belongsTo(User);

  await Post.hasMany(Comment, { onDelete: "cascade", onUpdate: "cascade" });
  await Comment.belongsTo(Post);

  await Post.sync();
  await User.sync();
  await Comment.sync();
};

module.exports = initdb;
