import React from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {Button, IconButton, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/react";
import {ViewIcon} from "@chakra-ui/icons";
import {ModalBody ,ModalHeader ,} from "@chakra-ui/react";

export const ProfileModel = ({user,children}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();


    return (
        <>
            {children?(
                <span onClick={onOpen}>{children}</span>
            ): (
                <IconButton
                display={{base: "flex"}}
                icon={<ViewIcon />}
                onClick={onOpen}

                />
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{user.name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme= "blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
