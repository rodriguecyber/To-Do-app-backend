import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
  userId:{type:String,required:true},
    task: String,
    date: String,
    time: String,
  });
  
   
  const Task=mongoose.model('Task', taskSchema);
  export default Task
