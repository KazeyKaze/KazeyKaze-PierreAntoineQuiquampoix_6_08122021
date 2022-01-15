const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");
const { where } = require("sequelize/dist");

///////////////////////////////
// POST
///////////////////////////////
exports.createComment = (req, res, next) => {
  if (req.body.text == "") {
    return res
      .status(400)
      .json({ message: "Votre commentaire ne peut pas être vide." });
  } else {
    const comment = new CommentModel({
      UserId: req.token.userId,
      PostId: req.params.id,
      text: req.body.text,
    });
    comment
      .save()
      .then(() =>
        res.status(201).json({
          message: "Commentaire enregistré !",
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
exports.modifyComment = (req, res, next) => {
  CommentModel.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (comment.UserId === req.token.userId || req.token.isAdmin === true) {
        if (req.body.text == "") {
          return res
            .status(400)
            .json({ message: "Votre commentaire ne peut pas être vide." });
        }
        if (req.body.text) {
          comment.text = req.body.text;
        }
        comment
          .save()
          .then(() =>
            res.status(201).json({
              message: "Commentaire modifié !",
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
    })
    .catch((err) =>
      res.status(400).json({
        err,
      })
    );
};

///////////////////////////////
// DELETE
///////////////////////////////
exports.deleteComment = (req, res, next) => {
  CommentModel.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (comment.UserId === req.token.userId || req.token.isAdmin === true) {
        CommentModel.destroy({
          where: { id: req.params.id },
        })
          .then(() =>
            res.status(200).json({
              message: "Commentaire supprimé !",
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
exports.getAllComments = (req, res, next) => {
  CommentModel.findAll({
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
exports.getOneComment = (req, res, next) => {
  CommentModel.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
