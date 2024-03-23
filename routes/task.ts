import { Request, Response } from "express";
import express from 'express'
import Task from "../models/Task";
import authenticateToken from "../middeware/userMidleware";
import {taskValiadtion, validationSchema} from '../validation/taskValidation'

const taskRoutes=express.Router()



taskRoutes.post('/upload',authenticateToken, async(req:any, res:Response) => {
  try {
    const newTask ={
      userId:req.currentUser._id,
      task: req.body.task,
      date: req.body.date,
      time: req.body.time
    };
     const validResult =validationSchema.validate(newTask)
     if(validResult.error){
      res.status(400).json({ error: validResult.error.details[0].message });
     }
     else{
    await Task.create(newTask);
    res.json({message:'task added'})

  }
    
  } catch (error) {
    res.send('Error creating task:');
    res.status(500)
  }
});
taskRoutes.get('/',async(req,res)=>{
 try{
  const task= await Task.find()  
  res.json(task)
  res.status(200)
 }
 catch(error){
 res.json('failed to get tasks')
 }
})
taskRoutes.delete('/delete/:id',async(req,res)=>{
try{
    
  await Task.findOne({_id:req.params.id})
  await Task.deleteOne({_id:req.params.id})
 res.json('task deleted')
}
catch(error){
  res.json('failed to delete task')
}
})

taskRoutes.patch('/update/:id', async(req:Request,res:Response)=>{
  try{
    
  await Task.findOne({_id:req.params.id})
  await Task.updateOne(
    {_id:req.params.id},
    {
  $set:{
    task:req.body.task,
    date:req.body.date,
    time:req.body.time
  }
  
},
{upsert:true})
     res.send('task updated')
  }
  catch(error){
    res.status(400).send('failed to update')
  }})
 export default  taskRoutes