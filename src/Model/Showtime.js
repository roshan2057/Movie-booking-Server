import mongoose from "mongoose";

const Time = new mongoose.Schema({
  time: String,
});

const Show = mongoose.model("show_time", Time);

export default Show;
