const express = require("express");
const chatModel = require("./models");
const app = express();

app.post("/", async (req, res) => {
    const userName = req.body.userName;
    const text = req.body.text;
    const d = new Date();
    const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
    const messageData = new chatModel({userName: userName, text: text, date: datestring});

    try {
        await messageData.save();
        res.send(messageData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/", async (req, res) => {
    const messageDataGet = await chatModel.find({}).sort({'date': -1}).limit(20);
    messageDataGet.reverse();
    try {
        res.send(messageDataGet);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
