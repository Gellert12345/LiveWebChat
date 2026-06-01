//MyChats groupChatModel szemantikus elemet irjui meg itt like <h1></h1>
import React, {useState} from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Button,
    ButtonGroup, FormControl,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useToast,
    Input, Box
} from "@chakra-ui/react";
import {ChatState} from "../../Context/ChatProvider";
import axios from "axios";
import UserListitem from "../UserAvatar/UserListltem";
// itt a children az a myChats.js-be a button!
const GroupChatModel = ({children}) => {

    const { isOpen,onOpen, onClose} = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const {user, chats,setChats} = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const  config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}`, config); //data === user search
            console.log(data);
            setLoading(false);
            setSearchResults(data);
        } catch(error) {
            toast({
                title: "Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    };


    const handleSubmit = () => {};
    const handleDelete = () => {};
    const handleGroup = () => {
        if(selectedUsers.includes(userToAdd)) {
            toast({
                title: "User Already Added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span> {/*Childern az egy gomb és ide rendereljuk be!*/}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        display="flex"
                        justifyContent="center"
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <FormControl>
                            <Input placeholder="Chat Name"
                                   mb={3}
                                   onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input placeholder="Add Users eg: Jazi Imi Gellert"
                                   mb={1}
                                   onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box width="100%" display="flex" flexWrap="wrap">
                        {selectedUsers.map(u => (
                            <UserBadgeItem key={user._id}
                                           user={u}
                                           handleFunction={()=> handleDelete(u)}
                            />
                        ))}
                        </Box>
                        {loading?<div>loading</div>: (
                            searchResults?.slice(0, 4).map(user=>(
                                <UserListitem key={user._id} user={user} handleFunction={()=> handleGroup(user)}></UserListitem>
                            ))
                        )}
                    </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue"  onClick={handleSubmit}>Close</Button>
                    Create Chat
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}
export default GroupChatModel;