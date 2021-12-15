const PostModel = require("../models/post.model");
const fs = require("fs");

///////////////////////////////
// POST
///////////////////////////////
exports.createPost = (req, res, next) => {
  const post = new PostModel({
    text: req.body.text,
    UserId: req.body.userId,
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // });
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
};

///////////////////////////////
// PUT
///////////////////////////////
exports.modifyPost = (req, res, next) => {
  PostModel.findOne({
    _id: req.params.id,
  }).then((post) => {
    if (post.userId === req.token.userId) {
      const postObject = req.file
        ? {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : {
            ...req.body,
          };
      PostModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          ...postObject,
          _id: req.params.id,
        }
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
    _id: req.params.id,
  })
    .then((post) => {
      if (post.userId === req.token.userId) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.deleteOne({
            _id: req.params.id,
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
exports.getAllPost = (req, res, next) => {
  PostModel.find()
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
    _id: req.params.id,
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
