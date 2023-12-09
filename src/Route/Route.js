import express from "express";
import { addmovie, addshow, listmovies, moviedetails, register, reserve, reserveseat, viewbooking, viewshow } from "../Controller/Usercontroller.js";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("home");
    console.log("home");
})

router.get('/listmovies',listmovies)
router.get('/showtime',viewshow)
router.get('/details/:id',moviedetails)
router.get('/reserve/:id',reserveseat)
router.get('/bookinglist',viewbooking)


router.post('/addmovie',addmovie);
router.post('/register',register);
router.post('/addshow',addshow);
router.post('/reserveseat',reserve);

export default router;