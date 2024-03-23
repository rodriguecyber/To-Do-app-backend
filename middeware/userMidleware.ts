import User from '../models/User';
import jwt from 'jsonwebtoken'
import { NextFunction } from "express";
const  authenticateToken =async (req: any, res:any, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET as string, async(err: any, decoded: any) => {
        if (err) return res.json({status:403,message:'token is invalid or expired! please login again' })
        req.currentUser =await User.findById(decoded.userId); 
        const exDate=decoded.exp
        
       if(Math.floor(Date.now() / 1000)>exDate )
        {
           res.json({
            message:"token expired"
           }) 
        }
        else{
        next();
    }
    });
};
 export default authenticateToken