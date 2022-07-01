require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require("mongoose");
const MovieDetail = require('./Model/MovieDetail');

app.use(express.json())

//Attempt to connect to database
const db = require("./setup/myurl").mongoURL;

mongoose
  .connect(db , {  useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));




const movieList = require("./routes/api/movieList")
app.use("/api/movieList", movieList)



const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));