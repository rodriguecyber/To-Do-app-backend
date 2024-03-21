import User from '../models/User';
import jwt from 'jsonwebtoken'
import { NextFunction } from "express";
const  authenticateToken =async (req: any, res:any, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
     if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET as string, async(err: any, decoded: any) => {
        if (err) return res.sendStatus(403); 
        req.currentUser =await User.findById(decoded.userId); 
        
        next();
    });
};
 export default authenticateToken