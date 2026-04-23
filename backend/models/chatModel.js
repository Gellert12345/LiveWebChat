/*
ezeket a váltzókat fogjuk hazsnalni=>
chatName
isGroupChat
users
latestMessage
groupAdmin
*/

const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
    {
        chatName: {type: String, trim: true},
        isGroupChat: {type: Boolean, default: false},
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ],
        //a legujabb uzenet elöl legyen
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message", //ref => reference vagyis utal a felhasznalóra
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat",chatModel); // vissza utalunk az elobb definiált Schemara!
module.exports = Chat;

