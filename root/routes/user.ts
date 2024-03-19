import { Request, Response } from "express";
import express from 'express'
import User from "../models/User";

const userRoutes=express.Router()
  userRoutes.post('/signup', async(req:Request,res:Response) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            telno: req.body.email,
            password: req.body.password
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to register');
    }
});

userRoutes.post('/login', async (req:Request,res:Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send('User not found');
        } else {
            if (user.password === req.body.password) {
                res.send('Logged in');
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