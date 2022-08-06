//Express Router
const router = require("express").Router();

//Mongoose //importing just for creating MongoDB ObjectId from string
const mongoose = require("mongoose");

//User Model
const UserSettings = require("../models/userSettings");

//authentication middleware
const authentication = require("../middlewares/authentication")

router.get("/", authentication, async (req, res) => {
    try {

        const userId = req.user._id;

        const settings = await UserSettings.findOne({ _id: userId });

        res.status(200).send(settings);

    } catch (error) {
        console.log(error);

        //status  code 500 -> Server problem.
        res.status(500).send({ message: "Internal server error" });
    }
})

router.post('/update', authentication, async (req, res) => {
    try {
        const userId = req.user._id;

        const { language, theme, fontsize, tabsize } = req.body;

        const settings = await UserSettings.findOne({ _id: userId });

        if (!settings) {
            const newSettings = new UserSettings({
                _id: userId,
                language: language,
                theme: theme,
                fontsize: fontsize,
                tabsize: tabsize
            })

            await newSettings.save();
        } else {
            const updatedSettings = await UserSettings.updateOne({ _id: userId }, {
                language: language,
                theme: theme,
                fontsize: fontsize,
                tabsize: tabsize
            });
        }

        return res.status(200).send({ message: "Settings Updated!" })

    } catch (error) {
        console.log(error);

        //status  code 500 -> Server problem.
        res.status(500).send({ message: "Internal server error" });
    }
})


module.exports = router;