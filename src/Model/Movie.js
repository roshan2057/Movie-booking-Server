import mongoose from "mongoose";

const Movie = new mongoose.Schema({
    title:String,
    genre:String,
    description:String,
    director:String,
    cast:String,
    release_date:String,
    duration:String,
    imageurl:String,
    trailerurl:String,
    showtime:[{type:String, ref:'show_time'}]
});

export default mongoose.model('movies',Movie);