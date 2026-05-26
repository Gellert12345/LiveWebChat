import React from "react";
import { ChatState } from  "../Context/ChatProvider"
import {useState} from "react";
const MyChats = () => {
    const [loggedeUser, setLoggedeUser] = useState();
    const {selectedChat, setSelectedChat, user, chats ,setChats} = ChatState();


    return <div>My Chats</div>
};
export default MyChats;