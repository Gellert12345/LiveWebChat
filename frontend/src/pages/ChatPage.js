import React from "react";
import { Box } from "@chakra-ui/react";


import { ChatState } from  "../Context/ChatProvider.js"
import SideDrawer from "../components/miscellaneous/SideDrawer.js";
import MyChats from "../components/MyChats.js";
import ChatBox from "../components/ChatBox.js";
const ChatPage = () => {
    const { user } =ChatState() //ChatState-bol kiszedem a user értéket
    return (
        <div style={{width: "100%"}}>
            {user && <SideDrawer/>}
            <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="91.5vh"
            padding= "10px"
            >
                {user && <MyChats/> }
                {user && <ChatBox/> }
            </Box>
        </div>
    )
}
export default ChatPage;