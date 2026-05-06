//ACCESSCHAT API END POINT!!!!!
import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
export const accessChat = asyncHandler(async(req ,res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("UserId params not sent with request")
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [ //$and => mind a 2 értéknek igaznak kell lennie
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch: {$eq: userId}}},
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if(isChat.length > 0) {
        res.send(isChat[0]); // ha van chat ( 0nal tobb uzenet) akkor elkuldi neked
    } else { // ha nincs csinal egyet
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        //store in the database =>
        try {
            const createdChat = await Chat.create(chatData); //létrehozás
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

export const fetchChats = asyncHandler(async(req,res) => {
    //check with user is loged in and query all the chat for the user
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})//add vissza az összes chat-et amibe benne van a user!
            .populate("users", "-password") //populate az id helyére berakjak az egész user adatatot
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1})
            .then(async(results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                //vissza kuldeni az usernek
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const createGroupChat = asyncHandler(async(req ,res)=> {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please fill all the fields"});
    }
    var users = JSON.parse(req.body.users);

    //ha group chat kevesebb mint 2 ember(nem group)!
    if(users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are requiredn to form a group chat");
    }

    users.push(req.user);

    //create new query for the database!
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user, //mi leszunk a group adminok mkert mi hoztuk létre!
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password"); //; end
        res.status(200).json(fullGroupChat);
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
})

export const renameGroup = asyncHandler(async(req,res) => {
    const { chatId , chatName } = req.body; //frontend kuld json backendbe és ennek az adatatat szedjuk ki
    const updateChat = await Chat.findByIdAndUpdate(
        chatId, //melyik chatet
        {
            chatName: chatName,
        },
        {
            new:true, //frissetett adjan vissza (name)
        }
    )
        .populate("users","-password")
        .populate("groupAdmin", "-password");

    //error handaling and json data sending=>
    if(!updateChat) {
        res.status(404);
        throw new Error("Chat not found.");
    } else {
        res.json(updateChat) //vissza kuldesz egy json adatot amit a fronted feldolgoz
    }
});

export const addToGroupChat = asyncHandler(async(req,res) =>  {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(chatId, {
            $push: {users: userId},
        },
        {new: true}
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added){
        res.status(404);
        throw new Error("Chat not found.");
    } else {
        res.json(added);
    }
})


export const removeFromGroup = asyncHandler(async(req, res) => {
    const {chatId, userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users: userId},
        },
        {new: true}
    )
        .populate("users","-password")
        .populate("groupAdmin", "-password");
    if(!added) {
        res.status(404);
        throw new Error("Chat not found.");
    } else {
        res.json(added);
    }
});