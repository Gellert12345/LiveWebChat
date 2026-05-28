import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {useToast, Box, Button, Stack, Text} from "@chakra-ui/react";
import axios from "axios";
import {AddIcon} from "@chakra-ui/icons";
import {getSender} from "../config/ChatLogics";
import {GroupChatModel} from "./miscellaneous/GroupChatModel";

const MyChats = () => {
    const [loggedUser, setLoggedeUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
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
        }
    };

    useEffect(() => {
        setLoggedeUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, []);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModal>
                <Button
                    display="flex"
                    fontSize={{ base: "17px", md: "10px",lg: "17px" }}
                    rightIcon={<AddIcon />}

                >New Group Chat</Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                padding={3}
                bg="F8F8F8"
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"

            >
                {chats ? (
                    <Stack
                        overflowY="scroll"
                    >{chats.map(()=>(
                        <Box
                            onClick={() => setSelectedChat(chats)}
                            cursor="pointer"
                            bg={selectedChat === chats ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat === chats ? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chats._id}
                        >
                            <Text>
                                {!chats.isGroupChat?
                                    getSender(loggedUser,chats.users)
                                    : chats.chatName }
                            </Text>
                        </Box>
                    ))}</Stack>
                ): (
                    <ChatLoading></ChatLoading>
                )}
            </Box>

        </Box>
    );
};

export default MyChats;