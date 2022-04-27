// export express from modules
const express = require("express");
const mongoose = require("mongoose");

// Convert the request to js object
const bodyParser = require("body-parser");
// Prevent cors error when running on two ports
const cors = require("cors");
// Invoke express
const app = express();

//import routes
const postRoutes = require("./routes/posts");

//app middleware, act as a middleware to convert the requset to js object
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postRoutes);

const PORT = 8000;

// Database URL
const DB_URL =
  "mongodb+srv://Chathu:chathu123@cluster0.cdbqi.mongodb.net/mernCrud?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    // If the promise is success
    console.log("DB connected");
  }) // If not
  .catch((err) => console.log("DB connnection error", err));

// To run the application in port 8000, callback function
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
