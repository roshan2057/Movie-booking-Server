import mongoose from "mongoose";

const Book =new mongoose.Schema({
    movieID:{type:String, ref:'movies'},
    userID:{type:String, ref: 'user'},
    seat:[{type:String}],
    showtimeID:{type:String , ref:'show_time'}
});

export default  mongoose.model('Booking',Book)