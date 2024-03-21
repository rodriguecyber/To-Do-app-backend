import mongoose from "mongoose";
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type:Boolean
});

const User= mongoose.model('User', userSchema);
export default User