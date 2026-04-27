import React, { useState } from "react";
import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react";
import express from "express";


const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic , setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleClick = () => setShow(!show);
    const postDetails = (pics) => {
        setLoading(true);
        if(pic === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if(pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file",pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dguzmcaph");
            fetch("https://api.cloudinary.com/v1_1/dguzmcaph/image/upload",{
                method: "POST",
                body: data,
            })
                .then((res) =>.json())
                .then(data => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable:true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = () => {};

    return  (
        <VStack spacing="5px" color= "black">
            <FormControl id= "first-name" isRequired>
                <FormLabel>Name</FormLabel>
                    <Input
                        placeholder="Enter your Name"
                        onChange ={(e) => setName(e.target.value)}
                    />
            </FormControl>
            <FormControl id= "email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type={show? "text" : "password"}
                    placeholder="Enter your Email"
                    onChange ={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id= "password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input
                    type={"password"}
                    placeholder="Enter your Password"
                    onChange ={(e) => setEmail(e.target.value)}
                />
                    <InputRightElement width="4.5rem">
                        <Button h= "1.75rem" size= "sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id= "pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type= "file"
                    p={1.5}
                    accept= "image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width= "100%"
                style={{ marginTop: 15}}
                onClick={ submitHandler}
            >Sign Up</Button>
        </VStack>
    );
};
export default SignUp;