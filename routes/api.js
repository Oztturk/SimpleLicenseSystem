//Packages
import express from "express";
// Models
import unClaimedKeys from "../models/unClaimedKeys.js";
import activeLisances from '../models/activeLisances.js'
// Modules
import KEY from '../modules/generate.js'
import {addDaysToCustomDate,addDaysToday} from '../modules/date.js'

import timeDiff from "../modules/timediff.js";
import * as ip from '../modules/IP.js'
import * as log from "../modules/logger.js"
import * as mw from '../modules/middleware.js'

const router = express.Router();

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});


router.post("/gen",mw.genMiddleware, async (req, res) => {

    if (req.body.token != process.env.ADMINKEY){
        log.logToDiscord("Someone tried generate key",
            { name: "IP", value: `\`\`\`${ip.EncryptIp(req.ip)}\`\`\``, inline: true },
            { name: "Days", value: `\`\`\`${req.body.days}\`\`\``, inline: false },
            { name: "Used Token", value: `\`\`\`${req.body.token}\`\`\``, inline: false },

        );
        return res.status(403).send("unauthorized"); 
    }
    var newkey = KEY(20) 
    var check = await unClaimedKeys.findOne({key: newkey})
    if (check) return res.status(201).send("Please try again");

    new unClaimedKeys({key: newkey,days:req.body.days}).save();

    res.json({"key":newkey,"days": req.body.days})
});

//Edit this according to your preferences, I made it an IP because I will be obtaining a whitelist via IP
router.post("/usekey",mw.CheckMiddleware, async (req,res) => {
    var nkey = req.body.key;
    var check = await unClaimedKeys.findOneAndDelete({key: nkey})

    if (!check) return res.send("Please enter a valid key.")

    new activeLisances({ip: ip.EncryptIp(req.ip),key: nkey,date: addDaysToday(check.days)}).save();
    res.status(200).send("License successfully activated")
})


router.post("/check",mw.CheckMiddleware, async (req,res) => {
    var nkey = req.body.key;
    var check = await activeLisances.findOne({key: nkey})

    if (!check) return res.send("No active license found")
    if (ip.CompareIP(req.ip,check.ip) != true) return res.json({"Error": "This key does not belong to you"})
    if (addDaysToday(0) > check.date) return res.json({"Expired": check.date})


    res.json({
        "key": check.key,
        "IP": check.ip,
        "date": check.date,
        "Days Left": timeDiff(check.date)
    })
    
});

router.post('/adddays',mw.adddaysMiddleware, async (req,res) => {
    var check = await activeLisances.findOne({key: req.body.key})

    if (!check) return res.status(403).send("No active license found")
    if (req.body.token != process.env.ADMINKEY){
        log.logToDiscord("Someone tried Add days",
            { name: "Key", value: `\`\`\`${req.body.key}\`\`\``, inline: false },
            { name: "IP", value: `\`\`\`${ip.EncryptIp(req.ip)}\`\`\``, inline: true },
            { name: "Key Ip", value: `\`\`\`${check.ip}\`\`\``, inline: true },
            { name: "Days Left", value: `\`\`\`${timeDiff(check.date)}\`\`\``, inline: false },
            { name: "Date", value: `\`\`\`${check.date}\`\`\``, inline: true },
            { name: "Used Token", value: `\`\`\`${req.body.token}\`\`\``, inline: false },
            { name: "Compare IP", value: `\`\`\`${ip.CompareIP(req.ip, check.ip)}\`\`\``, inline: false },
        );
        return res.status(403).send("unauthorized"); 
    }

    const filter = { key: req.body.key };
    const update = {date: addDaysToCustomDate(check.date,req.body.days)};
    await activeLisances.findOneAndUpdate(filter, update).then(() => res.status(200).json({"OldExpireDate":check.date,"New":addDaysToCustomDate(check.date,req.body.days)}));

})


export default router;