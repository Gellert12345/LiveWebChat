//MyChats groupChatModel szemantikus elemet irjui meg itt like <h1></h1>
import React from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";

// itt a children az a myChats.js-be a button!
const GroupChatModel = ({children}) => {

    const { isOpen,onOpen, onClose} = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Lorem count={2}/>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}
export default GroupChatModel;