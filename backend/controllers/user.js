const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const db = require("../models/Index");

// Regex de validation
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//Création de compte
exports.signup = (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
//Si le champ mail  ,username ou le password est vide
  if (
    email == null ||
    email == "" ||
    username == null ||
    username == "" ||
    password == null ||
    password == ""
  ) {
      //Alors un message d'erreur apparait 
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être renseignés" });
  }
//Si le username est plus cours que 3 caracteres 
  if (username.length <= 3 || username.length >= 15) {
    return res
    //Alors un message d'erreur apparait
      .status(400)
      .json({ error: "Le pseudo doit contenir 3 à 15 caractères" });
  }
//Si l'adresse mail ne respect pas la forme 
  if (!emailRegex.test(email)) {
      //Alors un message d'erreur apparait
    return res.status(400).json({ error: "Adresse mail invalide" });
  }
//Si le mot de passe ne respect pas les Regex 
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
          //Alors un message d'erreur apparait
        error:
          "Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minusucle, un chiffre et un symbole",
      });
  }

  db.User.findOne({
    attributes: ["username" || "email"],
    where: {
      username: username,
      email: email,
    },
  })
    .then((userExist) => {
      if (!userExist) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = db.User.build({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              isAdmin: 0,
            });
            user
              .save()
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Votre compte a bien été créé !" })
              )
              .catch((error) =>
                res
                  .status(400)
                  .json({ error: "Une erreur s'est produite !" })
              );
          })
          .catch((error) =>
            res
              .status(500)
              .json({
                error:
                  "Une erreur s'est produite lors de la création de votre compte",
              })
          );
      } else {
        return res.status(401).json({ error: "Cet utilisateur existe déjà" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

exports.login = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              imageProfile: user.imageProfile,
              token: jwt.sign(
                { userId: user.id,isAdmin: user.isAdmin},
                `${process.env.RND_TKN}`,
                { expiresIn: "24h" }
              ),
            });
          })
          .catch((error) =>
            res
              .status(500)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res
          .status(404)
          .json({
            error: "Utilisateur inexistant, veuillez créer un compte",
          });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

exports.UserProfile = (req, res, next) => {
  const id = req.params.id;
  db.User.findOne({
    attributes: ["usrId", "username", "email", "isAdmin", "imageProfile"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(404).json({ error: "Une erreur s'est produite !" })
    );
};

exports.modifyUserProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RND_TKN);
  const userId = decodedToken.userId;

  req.body.user = userId;

  console.log("bodyUser", req.body.user);
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageProfile: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      if (userFound) {
        db.User.update(userObject, {
          where: { id: userId },
        })
          .then((user) =>
            res
              .status(200)
              .json({ message: "Votre profil modifié avec succés !" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

exports.deleteAccount = (req, res, next) => {
  const id = req.params.id;
  db.User.findOne({
    attributes: ["id"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        db.User.destroy({
          where: { id: id },
        })
          .then(() =>
            res.status(200).json({ message: "Votre compte a été supprimé" })
          )
          .catch(() =>
            res
              .status(500)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};
