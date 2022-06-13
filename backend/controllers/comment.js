const jwt = require("jsonwebtoken");
const db = require('../models/Index');


exports.createComment = (req, res, next) => {    
    const userId = req.auth.id;
    
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const comment = db.Comment.build({
                content: req.body.content,
                postId: postFound.id,
                userId: userId
            })
            comment.save()
                .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}



exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'username', 'imageProfile' ]
        }]
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
            console.log(commentFound);
        } else {
            res.status(404).json({ error: 'Aucun commentaire trouvé' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Une erreur s\'est produite !' });
    });
}



exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
    })
    .then(commentFound => {
        if(commentFound && (req.auth.admin || req.auth.id==commentFound.userId)) {
            db.Comment.destroy({ 
                where: { id: req.params.commentId } 
            })
            .then(() => res.status(200).json({ message: 'Votre commentaire a été supprimé' }))
            .catch(() => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
            
        } else {
            return res.status(404).json({ error: 'Commentaire non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}