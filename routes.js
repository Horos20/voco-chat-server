const express = require("express");
const chatModel = require("./models");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

app.post("/", async (req, res) => {
    const userName = req.body.userName;
    const text = req.body.text;
    const messageData = new chatModel({userName: userName, text: text});

    try {
        await messageData.save();
        res.send(messageData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/", async (req, res) => {
    const messageDataGet = await chatModel.find({});

    try {
        res.send(messageDataGet);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
