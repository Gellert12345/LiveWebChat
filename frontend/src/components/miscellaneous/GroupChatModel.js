//MyChats groupChatModel szemantikus elemet irjui meg itt like <h1></h1>
import React from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {
    Button,
    ButtonGroup,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

// itt a children az a myChats.js-be a button!
const GroupChatModel = ({children}) => {

    const { isOpen,onOpen, onClose} = useDisclosure();

    return (
        <>
            <span onClick={onOpen}>{children}</span> {/*Childern az egy gomb és ide rendereljuk be!*/}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>

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