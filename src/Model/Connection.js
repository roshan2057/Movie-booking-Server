import mongoose from "mongoose";

mongoose.connect(process.env.database).then(()=>{
    console.log("database connected");
}).catch(()=>{
    console.log("database not connected")
})