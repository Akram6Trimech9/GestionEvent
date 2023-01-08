const mongoose=require('mongoose')
const ContactModel= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId ,
name :{type:String ,required:true } ,
email:{type:String ,required:true },
message:{type:String ,required:true }, 
    versionKey: false});
module.exports=mongoose.model('Contacts',ContactModel)