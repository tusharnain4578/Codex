//Express Router
const router = require("express").Router();

//User Model
const User = require("../models/user");


router.post('/', async (req, res) => {
    try {
        //checking if the email is already registerd
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //status  code 201 -> (Conflict) indicates that the request could not be processed because of conflict in the request, such as the requested resource is not in the expected state, or the result of processing the request would create a conflict within the resource
            res.status(409).send({ message: "\"Email\" already registered." });
            return;
        }

        //hashing the password
        //password hashing is on user.js // where model is

        //inserting into db
        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await newUser.save();

        //status  code 201 -> Data creation successfull
        res.status(201).send({ message: "User registerd Successfully" });

    } catch (error) {

        // status  code 500 -> Server problem
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;


// if (error.name == "ValidationError") {
//     //status  code 400 -> Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error
//     // console.log(error.errors);
//     res.status(400).send(error);
//     return
// }