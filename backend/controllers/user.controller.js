const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

///////////////////////////////
// SIGNUP
///////////////////////////////
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new UserModel({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

///////////////////////////////
// LOGIN
///////////////////////////////
exports.login = (req, res, next) => {
  UserModel.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé !",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            token: jwt.sign(
              {
                userId: user.id,
                firstName: user.firstName,
                isAdmin: user.isAdmin,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

///////////////////////////////
// DELETE
///////////////////////////////
exports.deleteUser = (req, res, next) => {
  UserModel.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id === req.token.userId || req.token.isAdmin === true) {
        UserModel.destroy({
          where: { id: req.params.id },
        })
          .then(() =>
            res.status(200).json({
              message: "Utilisateur supprimé !",
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
