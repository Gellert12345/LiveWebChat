import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { ChatState } from "../../Context/ChatProvider.js";
import { ProfileModel } from "../miscellaneous/ProfileModel.js";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();
    const history = useHistory();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const handleSearch = async () => {
        if (!search.trim()) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error occurred",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } finally {
            setLoading(false);
        }
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
                            <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch} isLoading={loading}>
                                Go
                            </Button>
                        </Box>

                        {searchResult.map((user) => (
                            <Box
                                key={user._id}
                                p={3}
                                bg="#E8E8E8"
                                w="100%"
                                borderRadius="lg"
                                cursor="pointer"
                                mb={2}
                                _hover={{ background: "#38B2AC", color: "white" }}
                            >
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm">{user.email}</Text>
                            </Box>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;