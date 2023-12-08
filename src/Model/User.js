import mongoose from "mongoose";

const Users = mongoose.Schema({
    name:String,
    email:String,
    password:String,
});


export default User =mongoose.model('user',Users);
