const express = require("express");
const chatModel = require("./models");
const app = express();

app.post("/addData", async (req, res) => {
    const userName = "John";
    const text = "Lorem ipsum";
    const messageData = new chatModel({userName: userName, text: text});

    try {
        await messageData.save();
        res.send(messageData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/getData", async (req, res) => {
    const messageDataGet = await chatModel.find({});

    try {
        res.send(messageDataGet);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
