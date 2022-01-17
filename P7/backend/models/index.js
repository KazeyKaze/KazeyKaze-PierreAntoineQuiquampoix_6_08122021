const Post = require("./post.model");
const User = require("./user.model");
const Comment = require("./comment.model");

const initdb = async () => {
  await Post.belongsTo(User, { onDelete: "cascade" });
  await Post.hasMany(Comment);
  await Comment.belongsTo(User, { onDelete: "cascade" });



  /////////////////////////////////////////////////////////
  // - Si c'est la première fois que vous lancez le projet,
  // décommentez les lignes 20, 21 et 22 et commentez les
  // lignes 23, 24 et 25.
  ///////////////////////
  // - Une fois la BDD créée, faites l'inverse, décommentez les
  // lignes 23, 24 et 25 et commentez les lignes 20, 21 et 22.
  /////////////////////////////////////////////////////////
  await Post.sync({ alter: true });
  await User.sync({ alter: true });
  await Comment.sync({ alter: true });
  // await Post.sync();
  // await User.sync();
  // await Comment.sync();
};

module.exports = initdb;
