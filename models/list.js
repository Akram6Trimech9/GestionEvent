const mongoose=require('mongoose')
const listmodel= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId ,
event:{type:mongoose.Schema.Types.ObjectId,ref:'event',required:true},
user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}, 
    versionKey: false});
module.exports=mongoose.model('listmodel',listmodel)