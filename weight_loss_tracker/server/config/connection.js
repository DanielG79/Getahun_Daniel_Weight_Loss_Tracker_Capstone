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

app.get("/api/config", (req, res) => {
    res.json({ mongoURI: process.env.MONGODB_URI });
});