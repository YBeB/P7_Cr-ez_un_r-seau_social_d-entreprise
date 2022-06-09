
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');


// Routes de l'API pour les messages
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCtrl.modifyPost);
router.delete('/:postId', auth, postCtrl.deletePost);

router.post('/:postId/like', auth, likeCtrl.likePost);
router.get('/:postId/like', auth, likeCtrl.getAllLike);

// Permet d'exporter le router
module.exports = router;