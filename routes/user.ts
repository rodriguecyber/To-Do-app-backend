import { Request, Response } from "express";
import express from 'express'
import User from "../models/User"
import authenticateToken from '../middeware/userMidleware'
import jwt from 'jsonwebtoken'
const userRoutes=express.Router()


  userRoutes.post('/signup', async(req:Request,res:Response) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to register');
    }
});
userRoutes.get('/user',authenticateToken, async(req:any,res:Response)=>{    
try{
    const user=req.currentUser
if(user.type){
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
          
                const token = jwt.sign({userId:user._id},process.env.JWT_SECRET as string, {expiresIn:"2d"})
                req.currentUser=user
                res.status(200).json({message:'user loged in',token:token});
            } else {
                res.send('Wrong password');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
      export default userRoutes