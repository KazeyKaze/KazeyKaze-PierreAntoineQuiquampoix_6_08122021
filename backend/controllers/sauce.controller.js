const Sauce = require("../models/sauce.model");
const fs = require("fs");

///////////////////////////////
// POST
///////////////////////////////
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: "Sauce enregistrée !",
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
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  }).then((sauce) => {
    if (sauce.userId === req.token.userId) {
      const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : {
            ...req.body,
          };
      Sauce.updateOne(
        {
          _id: req.params.id,
        },
        {
          ...sauceObject,
          _id: req.params.id,
        }
      )
        .then(() =>
          res.status(200).json({
            message: "Sauce modifiée !",
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
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (sauce.userId === req.token.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({
            _id: req.params.id,
          })
            .then(() =>
              res.status(200).json({
                message: "Sauce supprimée !",
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
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
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
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
