const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();

const port= 8080;
const db = process.env.DB;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // is this even needed?
app.use(cors());

mongoose.connect(db,//connect to db
    err =>{
        if(err)throw err;
        console.log("Connected to MongoDB");
    });

app.post('/signInUser',routes.LoginRegister);
app.post('/submitWorkout', routes.SubmitSet);
app.get('/previousWorkouts/:UserID', routes.GetWorkouts);
app.get('/getGraphData/:UserID/:Exer',routes.GetGraphData);


app.listen(port, () => {
    console.log( `Server running on port ${port}`);
});