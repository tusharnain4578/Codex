//Express Router
const router = require("express").Router();

//BcryptsJs
const bcrypt = require("bcryptjs");


//User Model
const User = require("../models/user");



router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            //status  code 401 -> Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
            res.status(401).send({ message: "Invalid Email or Password" });
            return;
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            //status code 401 -> Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
            res.status(401).send({ message: "Invalid Email or Password" });
            return;
        }

        const token = user.generateAuthToken();
        res.cookie("auth_token", token, {
            expires: new Date(Date.now() + 315360000000),
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        //status code 200 -> The HTTP 200 OK success status response code indicates that the request has succeeded
        res.status(200).send({ token: token, message: "User Logged in successfully" });

    } catch (error) {
        // console.log(error);
        //status  code 500 -> Server problem.
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;