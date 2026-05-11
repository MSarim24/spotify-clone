const router=require('express').Router();
const authControl=require('../controllers/authController.js')
router.post('/login',authControl.login)
router.post('/register',authControl.register)
module.exports=router