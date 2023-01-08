const router=require("express").Router()
const ListController=require('../Controllers/ListController')
const multer=require('../config/multer')
router.post('/' , ListController.createlist ); 
router.get('/',ListController.getAlllists);
router.get('/accept/:id',ListController.acceptuser); 
router.get('/ref/:id',ListController.refuseuser); 
 module.exports=router ; 