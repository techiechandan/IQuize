const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');


// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/iQuizDataBase');

// const port = process.env.PORT || 5000;
const port = 4000;


// importing routes
const appRoutes = require('./routes/appRoute');
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute'); 


// server
const app = express();


// using cors
app.use(cors());


// body-parser
app.use(express.json()); // bot are same
app.use(bodyParser.urlencoded({extended:true})); // either use express.json() or bodyparser.urlencoded() 



// Routes
app.use("/",appRoutes);
app.use("/user",userRoutes);
app.use("/admin",adminRoutes);



//listening 
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})