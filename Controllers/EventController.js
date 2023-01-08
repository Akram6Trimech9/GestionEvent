const EventModel = require('../models/event')
const mongoose =require('mongoose')
exports.CreateEvent=   (req,res)=>{
        const event = new EventModel({
            _id:new mongoose.Types.ObjectId(),
            DescriptionEvent:req.body.DescriptionEvent,
            NomEvent:req.body.NomEvent,
            DateEvent:req.body.DateEvent,
            Eventemplacement:{
                longitude :req.body.longitude ,
                latitude : req.body.latitude  
            },
            image:req.file.path
        })
            event.save()
          .then(event=>{
              if(event){
                 return res.status(200).json(event)
              }else{
                return res.status(401).json({message:'something went wrong'})
              }
          })
          .catch(err=>{
            return res.status(404).json(err)

          })
}
exports.getallEvents=(req,res)=>{ 
    EventModel.find({})
         .exec()
          .then(events=>{ 
             if(events.length > 0 ){ 
                 return res.status(201).json(events)
             }else{
                  return res.status(401).json({message:'something went wrong'})
             }
          })
          .catch(err=>{ 
             return res.status(500).json(err)
          })
}
exports.getEventByid=(req,res)=>{ 
    EventModel.findById(req.params.id)
        .exec()
          .then(event=> { 
             if(event){ 
                 return res.status(201).json(event)
             }else{
                return res.status(401).json({message:'something went wrong'})
            }
          })
          .catch(err=>{ 
             return res.status(500).json(err)
          })
}
exports.updateEvent = async (req,res)=>{
    try {
        const event = await EventModel.findById(req.params.id);
        if(event){
            Object.keys(req.body).forEach(element=>{
                event[element]=req.body[element];
            })
            event.save().then(event_updated=>{
                event_updated && res.status(200).json(event_updated);
                !event_updated && res.status(400).json({message:'something went wrong'});
            }).catch(err=>{
                return res.status(500).json(err);

            })
        }
        else {
            return res.status(404).json({message:' event not found'});
        }
    }
    catch(err){
        return res.status(500).json(err);
    }
}


exports.deleteevent=(req,res)=>{
    EventModel.findOneAndDelete({_id:req.params.id})
    .exec()
    .then(result => {
        if (result) {
            return res.status(200).json({ message: 'event deleted' });
        } else {
            return res.status(400).json({ message: 'event delete failed' });
        }
    })
    .catch(err => {
        return res.status(500).json(err);
    })
}