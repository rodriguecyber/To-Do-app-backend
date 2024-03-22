import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user'
import taskRoutes from './routes/task'
import dotenv from 'dotenv'
dotenv.config()
const app = express(); 
const Database:any = process.env.MONGODB_URI
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
mongoose.connect(Database)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use('/api/v1',userRoutes)
app.use('/api/v1',taskRoutes)






app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
export default app;