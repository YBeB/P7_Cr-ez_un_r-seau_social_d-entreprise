const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.get('/myprofil',auth,userCtrl.UserProfile);
router.put('/change',auth,userCtrl.modifyUserProfile);
router.delete('/delete',auth,userCtrl.deleteAccount);
module.exports = router;