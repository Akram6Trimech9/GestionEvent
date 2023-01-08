const mongoose=require('mongoose')
const Usermodel= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId ,
nom : {type:String ,required:true } ,
prenom :{type:String ,required:true },
mdp : {type:String ,required:true } ,
role:{
    type:String,
    enum:['admin','subadmin','client']
},
email:{type:String ,required:true } ,
image : {type:String ,required:true },
events:[{type:mongoose.Schema.Types.ObjectId,ref:'event'}]
}, {
    versionKey: false});
module.exports=mongoose.model('user',Usermodel)