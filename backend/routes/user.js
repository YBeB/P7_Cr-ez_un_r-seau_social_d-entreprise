const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/user');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.get('/myprofil',auth,userCtrl.UserProfile);
router.put('/change',auth,multer,userCtrl.modifyUserProfile);
router.delete('/delete',auth,userCtrl.deleteAccount);
module.exports = router;