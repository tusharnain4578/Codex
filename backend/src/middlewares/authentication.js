//Express Router
const router = require("express").Router();

//JWT -> Json Web Token
const jwt = require("jsonwebtoken");


//User Model
const User = require("../models/user");


module.exports = async (req, res, next) => {
    try {
        //getting auth token
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).send({ message: "Authentication failed! " });
        }

        //getting data back from auth token auth token***
        const userToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const user = await User.findOne({ _id: userToken._id });

        if (!user) {
            return res.status(401).send({ message: "Authentication failed! " });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === "invalid token" || error.message === "invalid signature") {
            return res.status(401).send({ message: "Authentication failed! " });
        }
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}