import React from "react";
import { ChatState } from  "../Context/ChatProvider"
import {useState} from "react";
import {useToast} from "@chakra-ui/react";
import {config} from "dotenv";
import axios from "axios";
const MyChats = () => {
    const [loggedUser, setLoggedeUser] = useState(); // ha valtzoik ujra rendel
    const {selectedChat, setSelectedChat, user, chats ,setChats} = ChatState();

    const toast = useToast();

    const fetchCHats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                };
            const{data} = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Faild to load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        };
    };


    return <div>My Chats</div>
};
export default MyChats;