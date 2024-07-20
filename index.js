import express from "express";
import mongoose from "mongoose";
import bodyparser from 'body-parser';
import 'dotenv/config'
import Routes from './routes/routes.js'

const app = express();
app.use(bodyparser.json());
mongoose.connect(`${process.env.DB_URL}`)
    .then(()=>{
        app.listen(5000);
        console.log("Sever connected with database and listening on")
    })
app.use('/',Routes);