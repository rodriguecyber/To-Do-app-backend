import mongoose from "mongoose";
var userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password:{type: String, required:true},
    userType:{type:String, required:true,default:false}
});

const User= mongoose.model('User', userSchema);
export default User