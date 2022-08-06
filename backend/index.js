const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();


const app = express();

//database connection
const dbConnection = require("./db");
dbConnection(process.env.DB_URL, process.env.DB); //dburi and dbname

// importing authentication middleware
const authentication = require("./src/middlewares/authentication");
//user validation function
const validateUser = require("./src/middlewares/validateUser");

//importing routes
const registerRoute = require("./src/routes/register");
const loginRoute = require("./src/routes/login");
const logoutRoute = require("./src/routes/logout");
const settings = require("./src/routes/settings");
const isAuthRoute = require("./src/routes/isAuthenticated");


//importing Compiler API Endpoint
const compiler = require("./src/CompilerAPI/compile");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let temp1 = "http://127.0.0.1:3000";
let temp2 = "http://192.168.211.39:3000";



//CORS
const corsConfig = {
    origin: process.env.FRONTEND_PORT,
    credentials: true
}
app.use(cors(corsConfig));



//routes ------------------------------------------->

//Register route
app.use('/user/register', validateUser, registerRoute);

//Login route
app.use('/user/login', validateUser, loginRoute);

//Logout route
app.use('/user/logout', authentication, logoutRoute);

//Settings Update route
// it's /user/settings/update in the settings route
app.use('/user/settings', settings);

//Settings get route
app.use('/user/settings', settings);

//Authorization Check route
app.use('/user/auth', authentication, isAuthRoute);



//Compiler API/Endpoint/Route
app.use('/compiler', authentication, compiler);


app.listen(process.env.PORT, () => {
    console.log(`Codex server is listening on port ${process.env.PORT}`);
})