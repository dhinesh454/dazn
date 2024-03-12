const express = require('express');
const app = express();
const path = require('path');
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
app.use(express.static(path.join(__dirname,'views')));


///homePage when server starts
app.use('/',(req,res,next)=>{
    res.redirect('/Index/index.html');
});

mongoose.connect(process.env.MONGODB_MONGOOSE_URL)
.then((res)=>{
    app.listen(3000);
    console.log('connected!....')
})
.catch(err=>console.log(err));









