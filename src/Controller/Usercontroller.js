import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Booking from "../Model/Booking.js";
import Movies from "../Model/Movie.js";
import Show from "../Model/Showtime.js";
import User from "../Model/User.js";
import {
  Validateemail,
  Validatename,
  Validatepassword,
  Validatephone,
} from "./Validation.js";

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.jwt_key, { expiresIn: 25920 });
};

export const listmovies = async (req, res) => {
  try {
    const movie = await Movies.find({}, "title imageurl");
    res.status(200).send(movie);
  } catch (error) {
    res.send(error);
  }
};

export const addmovie = async (req, res) => {
  try {
    await Movies.collection.insertOne(req.body.movieData);
    res.status(200).send("Movie Saved");
  } catch (error) {
    res.send(error);
  }
};

export const viewshow = async (req, res) => {
  try {
    const show = await Show.find({});
    res.status(200).send(show);
  } catch (error) {
    console.log(error);
  }
};

export const addshow = async (req, res) => {
  try {
    await Show.collection.insertOne(req.body);
    res.status(200).send("stored");
  } catch (error) {
    res.send(error);
  }
};

export const moviedetails = async (req, res) => {
  try {
    const movie = await Movies.findById(
      req.params.id,
      "title director cast imageurl genre description release_date duration trailerurl"
    );
    res.status(200).send(movie);
  } catch (error) {
    res.send(error);
  }
};

export const reserveseat = async (req, res) => {
  try {
    const movieID = req.params.id;
    getReservationData(movieID)
      .then((reservation) => {
        res.status(200).send(reservation);
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
    req.body.userID = req.userID;

    const save = await Booking.collection.insertOne(req.body);
    res.status(200).send("saved");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const viewbooking = async (req, res) => {
  try {
    const data = await Booking.find({})
      .populate("movieID", "title")
      .populate("showtimeID")
      .populate("userID", "name phone")
      .sort({ showtimeID: 1 });
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
export const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!Validatename(name)) {
      return res.status(200).send("invalid name");
    }
    if (!Validateemail(email)) {
      return res.status(200).send("invalid email");
    }
    if (!Validatephone(phone)) {
      return res.status(200).send("invalid phone");
    }

    if (!Validatepassword(password)) {
      return res.status(200).send("Password weak");
    }

    const hash = await bcrypt.hash(password, 5);
    const data = {
      name,
      phone,
      email,
      password: hash,
    };
    const save = await User.collection.insertOne(data);
    console.log(save);
    res.status(201).send(save);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }, "password");

    if (!user) {
      return res.status(200).send("User not found");
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.send("Password Incorrect");
    }

    const token = createtoken(user.id);

    res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

export const profiledetails = async (req, res) => {
  try {
    const details = await User.findById(req.userID, "name phone email");

    res.status(200).send(details);
  } catch (error) {
    res.send(500).send(error);
    console.error(error);
  }
};

export const userseatreserve = async (req, res) => {
  try {
    const seats = await Booking.find({ userID: req.userID })
      .populate("movieID", "title")
      .populate("showtimeID", "time")
      .sort({ showtimeID: 1 });
    res.status(200).send(seats);
  } catch (error) {
    res.send(500).send(error);
    console.error(error);
  }
};
