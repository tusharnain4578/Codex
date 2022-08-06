const mongoose = require("mongoose");

module.exports = async (dbUrl, dbName) => {
    try {
        const conn = await mongoose.connect(dbUrl + dbName);

        if (conn)
            console.log(`Successfully Connected to ${dbName} database!`);

    } catch (error) {
        console.log(error);
        console.log("Couldn't connect to database!");
    }
}