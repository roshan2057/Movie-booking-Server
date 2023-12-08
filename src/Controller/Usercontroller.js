import Movies from "../Model/Movie.js";
import Show from "../Model/Showtime.js";



export const listmovies= async (req,res)=>{
  try{
    const movie = await Movies.find({},'title imageurl');
res.send(movie);
console.log("ok")
  }catch(error){
res.send(error)
  }

}

export const addmovie=async (req,res)=>{

  try{
    await Movies.collection.insertOne(req.body.movieData)
    res.send("ok")
    console.log("saved")
  }catch(error){
    res.send(error)
  }

}

export const viewshow = async(req,res)=>{
  try{
const show = await Show.find({});
res.send(show);
  }
  catch(error){
    console.log(error)
  }
}



export const addshow= async(req,res)=>{

  try{
await Show.collection.insertOne(req.body);
res.send("stored")
  }catch(error){
    res.send(error)
  }
}


export const moviedetails = async(req,res)=>{
  console.log(req.params.id);

  try{
   const movie= await Movies.findById(req.params.id,'title director cast imageurl genre description release_date duration trailerurl');
    console.log(movie)
    res.send(movie);

  }catch(error){
    res.send(error)
  }

}