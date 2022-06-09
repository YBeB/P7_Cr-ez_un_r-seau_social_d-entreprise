const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');



router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComment);



module.exports = router;