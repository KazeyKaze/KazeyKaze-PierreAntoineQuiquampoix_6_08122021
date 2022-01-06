const Sequelize = require("sequelize");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const fs = require("fs");
const { where } = require("sequelize/dist");

///////////////////////////////
// POST
///////////////////////////////
exports.createPost = (req, res, next) => {
  if (!req.file && req.body.text == "") {
    return res
      .status(400)
      .json({ message: "Votre post ne peut pas être vide." });
  } else {
    const post = new PostModel({
      UserId: req.token.userId,
      text: req.body.text,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
    });
    post
      .save()
      .then(() =>
        res.status(201).json({
          message: "Post enregistré !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
};

///////////////////////////////
// PUT
///////////////////////////////
exports.modifyPost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  }).then((post) => {
    if (post.UserId === req.token.userId || req.token.isAdmin === true) {
      if (!req.file && req.body.text == "") {
        return res
          .status(400)
          .json({ message: "Votre post ne peut pas être vide." });
      }
      PostModel.update(
        {
          text: req.body.text,
          image: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
        },
        { where: { id: req.params.id } }
      )
        .then(() =>
          res.status(200).json({
            message: "Post modifié !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    } else {
      res.status(403).json({
        message: "403: unauthorized request !",
      });
    }
  });
};

///////////////////////////////
// DELETE
///////////////////////////////
exports.deletePost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.UserId === req.token.userId || req.token.isAdmin === true) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.destroy({
            where: { id: req.params.id },
          })
            .then(() =>
              res.status(200).json({
                message: "Post supprimé !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        });
      } else {
        res.status(403).json({
          message: "403: unauthorized request !",
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

///////////////////////////////
// GET ALL
///////////////////////////////
exports.getAllPosts = (req, res, next) => {
  PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: UserModel,
        attributes: ["firstName", "lastName"],
      },
    ],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

///////////////////////////////
// GET BY ID
///////////////////////////////
exports.getOnePost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
