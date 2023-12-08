import Booking from "../Model/Booking.js";
import Movies from "../Model/Movie.js";
import Show from "../Model/Showtime.js";

export const listmovies = async (req, res) => {
  try {
    const movie = await Movies.find({}, "title imageurl");
    res.send(movie);
    console.log("ok");
  } catch (error) {
    res.send(error);
  }
};

export const addmovie = async (req, res) => {
  try {
    await Movies.collection.insertOne(req.body.movieData);
    res.send("ok");
    console.log("saved");
  } catch (error) {
    res.send(error);
  }
};

export const viewshow = async (req, res) => {
  try {
    const show = await Show.find({});
    res.send(show);
  } catch (error) {
    console.log(error);
  }
};

export const addshow = async (req, res) => {
  try {
    await Show.collection.insertOne(req.body);
    res.send("stored");
  } catch (error) {
    res.send(error);
  }
};

export const moviedetails = async (req, res) => {
  console.log(req.params.id);

  try {
    const movie = await Movies.findById(
      req.params.id,
      "title director cast imageurl genre description release_date duration trailerurl"
    );
    console.log(movie);
    res.send(movie);
  } catch (error) {
    res.send(error);
  }
};

export const reserveseat = async (req, res) => {
  console.log(req.params.id);
  try {
    const movieID = req.params.id;
    getReservationData(movieID)
      .then((reservation) => {
        console.log(reservation);
        res.send(reservation);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

// Function to retrieve reservation data
async function getReservationData(movieID) {
  try {
    // Find the movie details by ID
    const movie = await Movies.findById(movieID);
    if (!movie) {
      throw new Error("Movie not found");
    }

    // Find showtimes related to the movie
    const showtimes = await Show.find({ _id: { $in: movie.showtime } });

    // Prepare the data in the desired format
    const reserve = {
      movieName: movie.title,
      data: await Promise.all(
        showtimes.map(async (showtime) => {
          const bookings = await Booking.find({
            showtimeID: showtime._id,
            movieID: movieID,
          });

          // Aggregate seats for this showtime
          const rows = bookings.reduce((acc, booking) => {
            booking.seat.forEach((seat) => {
              if (!acc.includes(seat)) {
                acc.push(seat);
              }
            });
            return acc;
          }, []);

          return {
            id: showtime._id,
            time: showtime.time,
            rows: rows.length > 0 ? rows : [""],
          };
        })
      ),
    };

    return reserve;
  } catch (error) {
    console.error("Error getting reservation data:", error.message);
    throw error;
  }
}






export const reserve = async (req, res) => {
  try {
    const save = await Booking.collection.insertOne(req.body);
    res.send("saved");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const viewbooking = async(req,res)=>{


  try{
    const data =await Booking.find({}).populate('movieID','title').populate('showtimeID');
    res.send(data)
  }catch(error){
    console.error(error)
  }

}