import React from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {Button, IconButton, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/react";
import {ViewIcon} from "@chakra-ui/icons";
import {ModalBody ,ModalHeader ,Image , Text} from "@chakra-ui/react";

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
            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay/>
                <ModalContent height="410px">
                    <ModalHeader
                    fontSize="40px"
                    display="flex"
                    justifyContent="center"

                    >{user.name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}

                        />
                        <Text
                            fontSize={{base: "28px", md: "30px"}}

                        />
                        Email: {user.email}
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
