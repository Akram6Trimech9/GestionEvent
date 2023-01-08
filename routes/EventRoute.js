const router=require("express").Router()
const EventController=require('../Controllers/EventController')
const multer=require('../config/multer')
router.post('/Create' ,multer.single('image'), EventController.CreateEvent ); 
router.patch('/update/:id' , EventController.updateEvent ); 
router.delete('/delete/:id' , EventController.deleteevent ); 
router.get('/allevents',EventController.getallEvents)

router.get('/:id' , EventController.getEventByid ); 

 module.exports=router ; 