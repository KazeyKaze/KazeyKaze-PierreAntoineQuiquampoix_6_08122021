const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const passwordValidator = require("password-validator");

///////////////////////////////
// PASSWORD VALIDATOR SCHEMA
///////////////////////////////
const schema = new passwordValidator();

schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(30) // Maximum length 30
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

///////////////////////////////
// SIGNUP
///////////////////////////////
exports.signup = (req, res, next) => {
  if (
    !validator.isEmail(req.body.email) ||
    !schema.validate(req.body.password)
  ) {
    res.status(401).json({
      message: "L'email et/ou le mot de passe ne sont pas valides !",
    });
  }
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

///////////////////////////////
// PUT
///////////////////////////////
exports.modifyUser = (req, res, next) => {
  UserModel.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    if (user.id === req.token.userId || req.token.isAdmin === true) {
      if (req.body.firstName == "" || req.body.lastName == "") {
        return res.status(400).json({
          message: "Ces champs ne peuvent pas être vides",
        });
      }
      UserModel.update(
        { firstName: req.body.firstName, lastName: req.body.lastName },
        { where: { id: req.params.id } }
      )
        .then(() =>
          res.status(200).json({
            message: "Informations modifiées !",
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
// GET ALL
///////////////////////////////
exports.getAllUsers = (req, res, next) => {
  UserModel.findAll()
    .then((users) => {
      res.status(200).json(users);
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
exports.getOneUser = (req, res, next) => {
  UserModel.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
