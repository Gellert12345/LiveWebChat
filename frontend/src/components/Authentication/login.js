import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = () => {
        console.log(email, password);
    };

    return (
        <VStack spacing="5px" color="black">
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                mt={3}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
            variant= "solid"
            colorScheme= "red"
            width= "100%"
            onClick={() =>{
                setEmail("guest@example.com");
                setPassword("123456");
            }}

            >Get Guest User Credentials</Button>
        </VStack>
    );
};

export default Login;