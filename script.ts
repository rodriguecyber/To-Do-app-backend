import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user'
import taskRoutes from './routes/task'
const app = express(); 
const PORT = 5000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/todotask');
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