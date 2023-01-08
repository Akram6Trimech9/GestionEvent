const mongoose=require('mongoose')
const EventModel= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId ,
DescriptionEvent :{type:String ,required:true } ,
NomEvent:{type:String ,required:true },
DateEvent:{type:String ,required:true },
Eventemplacement:{ 
    longitude: Number,
    latitude: Number
},
image:{type:String ,required:true },
 users:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
}
, {
    versionKey: false});
module.exports=mongoose.model('event',EventModel)