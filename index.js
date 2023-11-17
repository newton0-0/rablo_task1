require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./Routes');

const dbURI = process.env.URI
const PORT = process.env.PORT

const app = express()

app.use(express.json());

// view engine
app.set('view engine', 'ejs');

//routing
app.use('/', Routes)

// database connection
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT || 4000, console.log(`DB connected and Server running on ${4000}`))
  })
  .catch((err) => console.log(err));