//Express Router
const router = require("express").Router();



router.get('/', (req, res) => {
    res.status(200).send({
        message: "Authentication Successfull!",
        user: {
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        }
    });
})

module.exports = router;