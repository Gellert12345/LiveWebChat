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
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {Avatar} from "@chakra-ui/icons"
import {ChatState} from "../../Context/ChatProvider.js";
import {ProfileModel} from "../miscellaneous/ProfileModel.js";



const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const  {user} =ChatState();
    return (
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
                <Button variant="ghost">
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
                        <ProfileModel>
                            {/*<MenuItem>My profile</MenuItem>*/}
                        </ProfileModel>
                        <MenuDivider/>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    );
};

export default SideDrawer;
