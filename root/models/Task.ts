const mongoose =require('mongoose')
const taskSchema = new mongoose.Schema({
    task: String,
    date: String,
    time: String,
  });
  
   
  const Task=mongoose.model('Task', taskSchema);
  export default Task
