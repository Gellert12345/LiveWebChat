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
    Input
} from "@chakra-ui/react";
import {ChatState} from "../../Context/ChatProvider";

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
                            <Input></Input>
                        </FormControl>
                    </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                    <Button variant="ghost">Secondary action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}
export default GroupChatModel;