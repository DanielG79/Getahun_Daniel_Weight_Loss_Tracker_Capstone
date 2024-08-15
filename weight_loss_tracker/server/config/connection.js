const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness_tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!')
}

);

module.exports = mongoose.connection;

const dotenv = require('dotenv');
dotenv.config();

const connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

module.exports = connection;

