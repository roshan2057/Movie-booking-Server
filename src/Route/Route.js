import express from "express";
import { addmovie, addshow, listmovies, moviedetails, viewshow } from "../Controller/Usercontroller.js";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("home");
    console.log("home");
})

router.get('/listmovies',listmovies)
router.get('/showtime',viewshow)
router.get('/details/:id',moviedetails)


router.post('/addmovie',addmovie);
router.post('/addshow',addshow);

export default router;