const mongoose=require('mongoose')
const contactModel=require('../models/Contact')

exports.postContact=(req,res)=>{ 
     const contact = new contactModel({ 
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name, 
        email :req.body.email , 
        message:req.body.message
     }) 
      contact.save()
      .then(contact=>{ 
          if(contact){ 
             return res.status(200).json(contact)
          }else{ 
            return res.status(401).json({ message:'something went wrong'})
          }
      })
    .catch(err=>{ 
         return res.status(500).json(err)
    })
}
exports.getAllcontact=(req,res)=>{ 
     contactModel.find()
       .exec()
        .then(result=>{ 
              if(result){ 
                 return res.status(200).json(result)
              }else{ 
                 return res.status(400).json({ message :'something went wrong '})
              }
        })
        .catch(err=>{ 
         return res.status(500).json(err)
        })
}