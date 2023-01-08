const UserModel=require('../models/user')
const mongoose=require('mongoose')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')

      
exports.SignUp=function(req,res){
   UserModel.find({email:req.body.email}) 
       .exec()
         .then(async email =>{
             if(email.length > 0 ){ 
                  res.status(401).json({message:'Email Deja exist '})
             }else{ 
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.mdp, salt, function(err, encrypted) {
                      if(err){
                         return  res.status(401).json('encrypting error')
                    }else{
                        const user = new UserModel({ 
                            _id:new mongoose.Types.ObjectId(),
                            nom : req.body.nom , 
                            prenom :req.body.prenom , 
                            mdp : encrypted  ,
                            email:req.body.email , 
                            role:req.body.role ,
                            image:req.file.path
                          })
                         user.save()
                          .then(user=>{
                              if(user){
                                return res.status(201).json({message:'User Created',user})
                              }else{
                                 return res.status(401).json({message:'something went wrong'})
                              }
                          })
                          .catch(err=>{
                              return res.status(500).json(err)
                          })
                    }
                })
            });             
                
                      
             }
             
         })
         
         .catch(err=>{
            return res.status(500).json(err)
         })
} 
exports.login= async (req,res)=>{
    UserModel.findOne({email:req.body.email})
       .exec()
       .then( async user=>{
             if(user){
              await    bcrypt.compare(req.body.mdp , user.mdp,(err,same)=>{ 
                     if(err){
                        return res.status(401).json({message:'mdp incorrect'})
                     }
                     if(same){
                         let nom=user.nom ; 
                        let role=user.role ; 
                        const token=jwt.sign({user_id:user._id,role:user.role,nom:user.nom},"secrets",{expiresIn:60*60*60 })
                           if(token){
                           return res.status(200).json({Message:'login Successfully',token,nom,role})
                           }else{
                            return res.status(401).json({message:'token error'})
                           } 
                   
                     }
                     else{
                        return res.status(401).json({message:'mdp Incorrect'}); 
                    }    
                 })

            } else{
                res.status(401).json({message:'user not found'})
            }
        })
        .catch(err=>{ 
             res.status(500).json(err)
        })
    
}
exports.GetAdmins=async(req,res)=>{
     try{
     const admin =await UserModel.find({role:"admin"})
     admin && admin.length > 0 && res.status(200).json(admin)
     admin && admin.length == 0 && res.status(404).json({message:'admin not found '})  
    }catch(err){ 
        return res.status(500).json(err)
    }
}
exports.GetAdmins=async(req,res)=>{
    try{
    const admin =await UserModel.find({role:"admin"})
    admin && admin.length > 0 && res.status(200).json(admin)
    admin && admin.length == 0 && res.status(404).json({message:'admin not found '})  
   }catch(err){ 
       return res.status(500).json(err)
   }
}
exports.GetSubAdmins=async(req,res)=>{
    try{
    const subadmin =await UserModel.find({role:"subadmin"})
    subadmin && subadmin.length > 0 && res.status(200).json(subadmin)
    subadmin && subadmin.length == 0 && res.status(404).json({message:'subadmin not found '})  
   }catch(err){ 
       return res.status(500).json(err)
   }
}
exports.GetUsers=async(req,res)=>{
    try{
    const client =await UserModel.find({role:"client"}).populate('events')
    client && client.length > 0 && res.status(200).json(client)
    client && client.length == 0 && res.status(404).json({message:'client not found '})  
   }catch(err){ 
       return res.status(500).json(err)
   }
}
exports.updateUser= (req,res)=>{
    userModel.findOne({$and:[{_id:req.params.id},{role:"client"}]})
    .exec()
    .then(async user => {
        if (user) {
            if(req.body.mdp){
             const  encrypted = await  bcrypt.hash(req.body.mdp, 10);
             user.mdp=encrypted;

        }
        Object.keys(req.body).forEach(element=>{
            if(element.toString() !== "mdp"){
                user[element]=req.body[element]
            }
        })
        user.save().then(result=>{
            if(result){
                return res.status(200).json({message:'update done ',user})
               }
               else {
                   return res.status(400).json({message:'update failed'});
               }
        }).catch(err=>{
            return res.status(500).json(err);
        })
    }
    else {
        return res.status(404).json({message:'Client not found'});

    }
})   
    .catch(err => {
        return res.status(500).json(err)
    })
}

exports.getuserByid=async(req,res)=>{ 
     try{   
    const user=UserModel.find({$and:[{role:"client"},{_id:req.params._id}]}).populate('events')
     user && res.status(200).json(user)
     !user && res.status(401).json({message:'user not found'}) 
}catch(err){ 
     res.status(500).json({message:'error'})
}
}

exports.deleteUser=(req,res)=>{
    UserModel.findOneAndDelete({$and:[{role:'client'},{_id:req.params.id}]})
       .exec()
          .then(result=>{ 
                if(result){ 
                     return res.status(200).json({message:'user deleted'})
                }else{
                     return res.status(401).json({message: 'user deleted failed '})
                }
          })
          .catch(err=>{ 
             res.status(500).json({message:'error'})
          })
}
exports.JoinEvent=async(req,res)=>{
     try{  
    const user =await UserModel.findByIdAndUpdate(req.params.id,{ $set:{ event: req.body.event}})
    
} catch(err){ 

} 
}
exports.getuserByid=function(req,res){ 
    UserModel.findOne({_id:req.params.id})
      .exec()
         .then(user=>{
              if(user){ 
                   return  res.status(201).json(user)
              }else{
                  return   res.status(401).json({message: 'user not found '})
              }
         })
         .catch(err=>{ 
            return res.status(500).json(err)
         })
} 
exports.delete=(req,res)=>{
    UserModel.findByIdAndDelete(req.params.id)
     .exec()
      .then(user=>{ 
         if(user){ 
            return res.status(200).json(message)
         }else{
             return res.status(400).json({message:"something went wrong"})
         }
      })
       .catch(err=>{ 
         return res.status(500).json(err)
       })
}   