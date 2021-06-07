// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const {errorHandler,notFoundHandler} = require("./middleware/common/errorHandler")

const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log("db connected successfully"))
.catch(err => console.log(err));

// request parser

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set view engine

app.set("view engine", "ejs");

// set static folder 

app.use(express.static(path.join(__dirname, "public")));

// cookie parser 

app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup 

// 404 not found handler
app.use(notFoundHandler);
// error handler
app.use(errorHandler);

app.listen(process.env.PORT,()=> {
    console.log(`listening to port ${process.env.PORT}`);
})