const router=require("express").Router()
const userController=require('../Controllers/UserController')
const multer=require('../config/multer')
router.post('/signup',multer.single('image'),userController.SignUp ); 
router.post('/login',userController.login)
router.get('/getclient',userController.GetUsers)
router.get('/getadmin',userController.GetAdmins)
router.get('/getsubadmin',userController.GetSubAdmins)
router.get('/:id',userController.getuserByid)
router.delete('/client/:id',userController.deleteUser)
 module.exports=router ; 