const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 100
    },
    text: {
        type: String,
        maxlength: 100
    },
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
