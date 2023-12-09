import express from "express";
import { addmovie, addshow, listmovies, login, moviedetails, register, reserve, reserveseat, viewbooking, viewshow } from "../Controller/Usercontroller.js";
import { auth } from "../Middleware/Auth.js";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("home");
    console.log("home");
})

router.get('/listmovies',listmovies)
router.get('/showtime',viewshow)
router.get('/details/:id',moviedetails)
router.get('/reserve/:id',auth, reserveseat)
router.get('/bookinglist',viewbooking)


router.post('/addmovie',addmovie);
router.post('/register',register);
router.post('/login',login);
router.post('/addshow',addshow);
router.post('/reserveseat',auth,reserve);

export default router;