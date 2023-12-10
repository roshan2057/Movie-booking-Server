import express from "express";
import { addmovie, addshow, listmovies, login, moviedetails, profiledetails, register, reserve, reserveseat, userseatreserve, viewbooking, viewshow } from "../Controller/Usercontroller.js";
import { auth } from "../Middleware/Auth.js";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("home");
    console.log("home");
})
// admin route 
router.get('/showtime',viewshow)
router.get('/bookinglist',viewbooking)

router.post('/addmovie',addmovie);
router.post('/addshow',addshow);

// movie route
router.get('/listmovies',listmovies)
router.get('/details/:id',moviedetails)
router.get('/reserve/:id',auth, reserveseat)

router.post('/reserveseat',auth,reserve);

//user route
router.get('/profile/details',auth,profiledetails)
router.get('/profile/reserveseats',auth,userseatreserve)

// login , register
router.post('/register',register);
router.post('/login',login);

export default router;