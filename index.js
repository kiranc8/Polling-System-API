const express = require('express');
const app = express();
const db = require("./config/mongoose");
port = 8080;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use('/questions', require('./routes/questions'));
app.use('/options', require('./routes/options'));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`)
  }
  console.log(`Server is running on port : ${port}`);
})