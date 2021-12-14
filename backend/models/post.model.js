///////////////////////////////
// POST SCHEMA
///////////////////////////////
const { Sequelize, DataTypes } = require("sequelize");

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

const Post = sequelize.define("Post", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Post.sync({ force: true }).then(() => {
  return Post.create({
    firstName: "Pierre-Antoine",
    lastName: "Quiquampoix",
    texte: "Voici le premier post !",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Fimage-en-couleur&psig=AOvVaw1gYZIn_qeQ_2BVSUd-P9oB&ust=1639558165567000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCP9aT04vQCFQAAAAAdAAAAABAD",
  });
});
