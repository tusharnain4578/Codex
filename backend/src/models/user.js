//Mongoose
const mongoose = require("mongoose");

//JWT -> Json Web Token
const jwt = require("jsonwebtoken");

//BcryptsJs
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY)

    return token;
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        //await necessary, dont believe ide here
        this.password = await bcrypt.hash(this.password, Number(process.env.SALT));

    }
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;