const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const port = process.env.PORT || 3050;

// import Routes
const userRoute = require('./route/userRoute');
const categoryRoute = require('./route/CategoryRoute');
const serviceRoute = require('./route/servicesRoute');
const imageRoute = require('./route/ImageRoute')

// Middleware use insted of body-parser
app.use(express.json());

//Router Middleware for user registration and login
app.use('/api/user', userRoute);

//Router Middleware for Category
app.use('/api/category', categoryRoute);


//Router Middleware for Services
app.use('/api/services', serviceRoute);

//Router for Image upload
app.use('/api/image', imageRoute);

//To enable Cross Origin
app.use(cors());

// Connect To DB
mongoose.connect(process.env.DB, { useUnifiedTopology: true }, ()=> console.log("Db is connected"));
// mongoose.connect("mongodb://localhost:27017/J", { useUnifiedTopology: true }, () => {
//   console.log("Db is connected");
// });
   


app.listen(port, () => console.log('Server is running'));