//Mongoose
const mongoose = require("mongoose");

const userSettingsSchema = mongoose.Schema({
    language: { type: String },
    theme: { type: String },
    fontsize: { type: Number },
    tabsize: { type: Number }
});

const UserSettings = new mongoose.model("user_setting", userSettingsSchema);

module.exports = UserSettings;