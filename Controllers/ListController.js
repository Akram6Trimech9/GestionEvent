const mongoose=require('mongoose')
const listmodel=require('../models/list')
const userModel=require('../models/user')
const eventModel=require('../models/event')

exports.createlist=(req,res)=>{
     const list = new listmodel({ 
        _id:new mongoose.Types.ObjectId(),
         user:req.body.user,
         event:req.body.event,
     })
     list.save()
      .then(list => { 
         if(list){ 
             console.log(list)
             return res.status(200).json(list)
         }else{
             return res.status(400).json({message:'something went wrong '})
         }
      })
      .catch(err=>{ 
        return res.status(500).json(err)
      })
}
exports.getAlllists=(req,res)=>{ 
   listmodel.find()
    .populate('user') 
     .populate('event')
      .exec()
       .then(result=>{ 
         if(result){ 
            return res.status(200).json(result)
         }else{ 
            return res.status(400).json({message:'something went wrong '})

         }
       })
       .catch(err=>{ 
         return res.status(500).json(err)
       })
}
exports.acceptuser=(req,res)=>{ 
    listmodel.findById(req.params.id)
     .exec()
      .then(async result=>{ 
         if(result){ 
            console.log(result,'ok')
              const user=await userModel.findByIdAndUpdate(result.user._id,{$push:{events:res.event}})
              const event=await eventModel.findByIdAndUpdate(result.event._id,{$push:{users:res.event}})
               if (user && event) { 
                     await listmodel.findByIdAndDelete(result._id) && res.status(200).json({message:'done'})
                                    
                }

         }else{
            return res.status(404).json({message:'list not found '})

         }
      })
      .catch(err=>{ 
         res.status(500).json(err)
      })
  
}
exports.refuseuser=(req,res)=>{ 
    listmodel.findByIdAndDelete(req.params.id)
     .exec()
      .then(list=>{ 
         if(list){ 
            return res.status(200).json({message:'everything is good' })

         }else{ 
            return res.status(400).json({message:'something went wrong' })

         }
      })
      .catch(err=>{ 
         return res.status(500).json(err)
      })

}