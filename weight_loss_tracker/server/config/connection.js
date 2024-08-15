// const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness_tracker", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, err => {
//     if (err) throw err;
//     console.log('Connected to MongoDB!')
// }

// );

// module.exports = mongoose.connection;

// const dotenv = require('dotenv');
// dotenv.config();

// const connection = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// };

// module.exports = connection;

const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoURI = process.env.MONGODB_URI;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        // Connect the client to the server
        await client.connect();
        // Ping the MongoDB server to verify connectivity
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToMongoDB };