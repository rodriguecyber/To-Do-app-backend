import { Request, Response } from "express";
import express from 'express'
import User from "../models/User"
import authenticateToken from '../middeware/userMidleware'
import jwt from 'jsonwebtoken'
import { verify } from "crypto";
const userRoutes=express.Router()


  userRoutes.post('/signup', async(req:any,res:Response) => {
    try {
       
      await User.find({email:req.body.email}).then(async(result:any)=>{
       if(result.length===0){
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json(newUser);
       }
       else{
        res.json({message:'user already exists'})
       }
        })
        
    
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to register');
    }
});
userRoutes.get('/user',authenticateToken, async(req:any,res:Response)=>{    
try{
    const user=req.currentUser
if(user.userType){
    const users = await User.find()
    res.json(users)

}
else{
    res.json({message:'not admin'})
}

}
catch(err){
 res.sendStatus(400) 
}

})

userRoutes.post('/login',async (req:any,res:Response) => { 
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send('User not found');
        } else {
            if (user.password === req.body.password) {
             const expire=eval(process.env.EXPIRE as string)
                const token = jwt.sign({userId:user._id,exp:expire},process.env.JWT_SECRET as string)
                req.currentUser=user
                res.status(200).json({message:'user loged in',token:token, expirein:(Math.floor(expire-Math.floor(Date.now())/1000))+"s"});
               req.exptime=expire
            } 
            else {
                res.send('Wrong password');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
userRoutes.post('/reset',(req:any,res)=>{
  const email:string=req.body.email
    User.find({email:email})
    .then((result:any)=>{
        if(result.length===0){
            res.json({message:'email not found'})
        } else{
            const resetExpire:Number=eval(process.env.RESETEXPIRE as string)
  const token = jwt.sign({email:email, exp:resetExpire},process.env.JWTRESET as string)
  req.currentRequest=email;
  res.json({message:'reset token sent ', token:token})
        }
    })
})
      export default userRoutes