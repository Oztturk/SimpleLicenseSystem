//Packages
import express from "express";
// Models
import unClaimedKeys from "../models/unClaimedKeys.js";
import activeLisances from '../models/activeLisances.js'
// Modules
import KEY from '../modules/generate.js'
import addDays from '../modules/date.js'
import timeDiff from "../modules/timediff.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});


router.get("/gen/:token", async (req, res) => {
    if (req.params.token == process.env.ADMINKEY){ // 100% SECURITY 🥶🍦🥶🍦🥶🍦🥶🍦
        var newkey = KEY(20) 
        var check = await unClaimedKeys.findOne({key: newkey})
        if (check) return res.status(201).json({"201":"Lütfen tekrar deneyin"});

        new unClaimedKeys({key: newkey}).save();

        res.json({"key":newkey})
    }
});

//Edit this according to your preferences, I made it an IP because I will be obtaining a whitelist via IP
router.post("/usekey", async (req,res) => {
    var nkey = req.body.key;
    var check = await unClaimedKeys.findOneAndDelete({key: nkey})

    if (!check) return res.send("Please enter a valid key.")

    new activeLisances({ip: req.ip,key: nkey,date: addDays(30)}).save();
    res.status(200).send("License successfully activated")
})


router.post("/check", async (req,res) => {
    var nkey = req.body.key;
    var check = await activeLisances.findOne({key: nkey})

    if (!check) return res.send("No active license found")
    if (req.ip != check.ip) return res.json({"Error": "This key does not belong to you"})
    if (addDays(0) > check.date) return res.json({"Expired": check.date})


    res.json({
        "key": check.key,
        "IP": check.ip,
        "date": check.date,
        "Days Left": timeDiff(check.date)
    })
    
});

export default router;