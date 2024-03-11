const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');



//routes
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');




//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRoutes);
app.use(movieRoutes);




mongoose.connect('mongodb+srv://dhina:pLcT3NJWZoxfFi3L@cluster0.dnrghh5.mongodb.net/DAZN?retryWrites=true&w=majority&appName=Cluster0')
.then((res)=>{
    app.listen(3000);
    console.log('connected!....')
})
.catch(err=>console.log(err));









