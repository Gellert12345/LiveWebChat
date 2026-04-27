import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

const ChatPage = () => {
//it fgojuk tárolni az értékeket=>
    const [chats, setChats] = useState([]);
        //api fetch!!!
        const fetchChats = async    ()  => {
            const {data} = await axios.get("/api/chat");
            setChats(data);
        };
        useEffect(() => {
            fetchChats();
        }, [])

    return (
        <div>{chats.map((chat) => (
            <div key={chat._id}>{chat.chatName}</div>
        ))}</div>
    )
}
export default ChatPage;