const CommentModel = require("../models/comment.model");

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
        { text: req.body.text },
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