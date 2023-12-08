import mongoose from "mongoose";

const Book = mongoose.Schema({
    movieID:{type:String, ref:'Movie'},
    userID:{type:String, ref: 'User'},
    seat:Array,
    showtimeID:{type:String , ref:'showtime'}
});

export default Booking = mongoose.model('Booking',Book)