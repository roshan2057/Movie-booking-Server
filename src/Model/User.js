import mongoose from "mongoose";

const Users =new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String,
});


export default mongoose.model('user',Users);
