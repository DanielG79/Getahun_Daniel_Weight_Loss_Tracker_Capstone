// const express = require("express");
// const path = require("path");
// const routes = require("./routes");
// const db = require("./config/connection");

// const PORT = process.env.PORT || 3001;
// const app = express();

// require("dotenv").config();

// const mongoURI = process.env.MONGODB_URI;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve up static assets
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.use(routes);

// db.once("open", () => {
//     app.listen(PORT, () => {
//         console.log(`API server running on port ${PORT}!`);
//     });
// });

const express = require('express');
const connection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Define your routes here
app.get('/api/config', (req, res) => {
    res.json(connection);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});