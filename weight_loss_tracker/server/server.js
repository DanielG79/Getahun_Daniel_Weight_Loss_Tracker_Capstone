// const express = require("express");
// const path = require("path");
// const routes = require("./routes");
// const db = require("./config/connection");
// const authRoutes = require("./routes/authRoutes");
// const authController = require("./controllers/authController");

// const PORT = process.env.PORT || 3001;
// const app = express();

// require("dotenv").config();

// const mongoURI = process.env.MONGODB_URI;

// // MongoDB connection
// const { MongoClient, ServerApiVersion } = require('mongodb');

// async function connectToMongoDB() {
//     try {
//         // Connect the client to the server
//         await client.connect();
//         // Ping the MongoDB server to verify connectivity
//         await client.db("admin").command({ ping: 1 });
//         console.log("Connected successfully to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// }

// const client = new MongoClient(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
// });

// connectToMongoDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve up static assets
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
// }

// // Routes
// app.use(routes);
// app.use("/api/auth", authRoutes);

// // Authentication routes
// app.post("/api/auth/signup", authController.signup);
// app.post("/api/auth/signin", authController.signin);

// db.once("open", () => {
//     app.listen(PORT, () => {
//         console.log(`API server running on port ${PORT}!`);
//     });
// });

const express = require("express");
const path = require("path");
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const authController = require("./controllers/authController");
const { connectToMongoDB } = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

// Routes
app.use(routes);
app.use("/api/auth", authRoutes);

// Authentication routes
app.post("/api/auth/signup", authController.signup);
app.post("/api/auth/signin", authController.signin);

// Connect to MongoDB and start the server
connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with a non-zero code to indicate failure
    });