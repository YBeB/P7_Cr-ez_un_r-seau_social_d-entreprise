const jwt = require("jsonwebtoken");
const db = require("../models/Index");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const content = req.body.content;

  const userId = req.auth.id;

  if (content == null || content == "") {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être renseignés" });
  }

  if (content.length <= 4) {
    return res
      .status(400)
      .json({
        error: "Le contenu du message doit contenir au moins 4 caractères",
      });
  }

  db.User.findOne({
    where: { id: userId },
  })

    .then((userFound) => {
      if (userFound) {
        const post = db.Post.build({
          content: req.body.content,
          imagePost: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : req.body.imagePost,
          UserId: userFound.id,
        });
        post
          .save()
          .then(() =>
            res.status(201).json({ message: "Votre message a bien été créé !" })
          )
          .catch((error) =>
            res.status(400).json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

exports.getAllPosts = (req, res, next) => {
  db.Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["username", "imageProfile"],
      },
      {
        model: db.Comment,
      },
    ],
  })
    .then((postFound) => {
      if (postFound) {
        res.status(200).json(postFound);
      } else {
        res.status(404).json({ error: "Aucun message trouvé" });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "Une erreur s'est produite !" });
    });
};

exports.modifyPost = (req, res, next) => {
  console.log("file", req.file);
  console.log("content", req.body.content);
  console.log("bodypost", req.body.post);
  const postObject = req.file
    ? {
        content: req.body.content,
        imagePost: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  console.log("body", req.body);
  console.log(req.params.postId);

  db.Post.findOne({
    where: { id: req.params.postId },
  })
    .then((postFound) => {
      if (postFound && (req.auth.admin || req.auth.id == postFound.userId)) {
        db.Post.update(postObject, {
          where: { id: req.params.postId },
        })
          .then((post) =>
            res
              .status(200)
              .json({ message: "Votre message a bien été modifié !" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ error: "Ue erreur s'est produite !" })
          );
      } else {
        res.status(404).json({ error: "Message non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({
    attributes: ["id"],
    where: { id: req.params.postId },
  })
    .then((post) => {
      if (post && (req.auth.admin || req.auth.id == postFound.userId)) {
        if (post.imagePost != null) {
          const filename = post.imagePost.split("/images/")[1];

          fs.unlink(`images/${filename}`, () => {
            db.Post.destroy({
              where: { id: req.params.postId },
            })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Votre message a été supprimé" })
              )
              .catch(() =>
                res
                  .status(500)
                  .json({ error: "Une erreur s'est produite !" })
              );
          });
        } else {
          db.Post.destroy({
            where: { id: req.params.postId },
          })
            .then(() =>
              res.status(200).json({ message: "Votre message a été supprimé" })
            )
            .catch(() =>
              res.status(500).json({ error: "Une erreur s'est produite !" })
            );
        }
      } else {
        return res.status(404).json({ error: "Message non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};
