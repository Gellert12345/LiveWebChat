import React, { useState } from "react";
import {
    Box,
    Tooltip,
    Button,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {Avatar} from "@chakra-ui/react"
import {ChatState} from "../../Context/ChatProvider.js";
import {ProfileModel} from "../miscellaneous/ProfileModel.js";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const  {user} =ChatState();

    const history = useHistory();
    const {isOpen , onOpen , onClose} = useDisclosure();


    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        useHistory.push("/");
    };


    return (
        <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            px="10px"
            py="5px"
            borderWidth="1px"
        >
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <Text display={{ base: "none", md: "flex" }} px="4">
                        Search User
                    </Text>
                </Button>
            </Tooltip>

            <Text fontSize="2xl">ChatApp</Text>

            <Box display="flex" alignItems="center" gap="10px">
                <Menu>
                    <MenuButton as={Button}>
                        <BellIcon fontSize="2xl" />
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size="sm" cursor="pointer" name ={user.name} src={user.pic}></Avatar>
                    </MenuButton>
                    <MenuList>
                        <ProfileModel user={user}>
                            <MenuItem>My profile</MenuItem>
                        </ProfileModel>
                        <MenuDivider/>
                        <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent borderWidth="1px">
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                </DrawerContent>
                <DrawerBody>
                    <Box display="flex" paddingBottom={2}>
                        <Input
                            placeholder="Search by name or email"
                            marginRight={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        ></Input>
                        <Button
                            //onClick={handleSearch}
                        >Go</Button>
                    </Box>
                </DrawerBody>
            </Drawer>
        </>
    );
};

export default SideDrawer;
