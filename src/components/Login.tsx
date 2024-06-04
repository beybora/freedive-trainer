"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const handleInputChange = (e: any) => {
    setUser((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("user", user);
    try {
      if (!user.email || !user.password) {
        toast({
          title: "All fields are required.",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        toast({
          title: "Invalid Email Address",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      const response = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Error logging in",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
      setUser({ email: "", password: "" });
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={user.password}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
