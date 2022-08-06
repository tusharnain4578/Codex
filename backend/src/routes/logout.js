//Express Router
const router = require("express").Router();



router.get("/", (req, res) => {
    res.cookie("auth_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.status(200).send({ message: "Log out successfull!" });
})

module.exports = router