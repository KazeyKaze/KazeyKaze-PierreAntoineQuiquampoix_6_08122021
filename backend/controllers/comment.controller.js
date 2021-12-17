const CommentModel = require("../models/comment.model");

///////////////////////////////
// POST
///////////////////////////////
exports.createComment = (req, res, next) => {
  if (req.body.text == "") {
    return res
      .status(400)
      .json({ message: "Votre post ne peut pas être vide." });
  } else {
    const comment = new CommentModel({
      PostId: req.params.id,
      text: req.body.text,
    });
    comment
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
