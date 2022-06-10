const app = require('express')();
const server = require('http').createServer(app);

const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
const io = require('socket.io')(server , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const express = require("express");
const Router = require("./routes");

const mongoose = require("mongoose");

// MongoDB account data
require("dotenv").config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.tpfx3.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// Check MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(express.json());

app.use(Router);

/*   Socket.io connection   */
io.on('connection', socket => {
    socket.on('sendMessage', (message, user) => {
        socket.broadcast.emit('receive-message', message, user)
    })
 });

const PORT = process.env.PORT || 8080;

server.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});

