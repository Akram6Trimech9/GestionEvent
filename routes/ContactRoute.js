const router=require("express").Router()
const ContactController=require('../Controllers/ContactController')
const multer=require('../config/multer')
 router.post('/' , ContactController.postContact ); 
router.get('/' , ContactController.getAllcontact ); 
 module.exports=router ; 