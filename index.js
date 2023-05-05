// Packages
import express from "express"
import mongoose from "mongoose"
import * as dotenv from 'dotenv' 

// Routes
import api from "./routes/api.js"
const app = express();

dotenv.config()

app.use(express.json());

app.use("/api",api)

app.listen(process.env.Port, () => {
    console.log(`✔ Server`);
    mongoose.connect(process.env.MONGOURL).then(() => console.log('✔ Database'));
})