"use client";

import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  // TODO: Implement react hook form later after the basic working of authentication
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    setUser((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!user.name || !user.email || !user.password) {
      toast({
        title: "Fill out all fields",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return; 
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating user");
      }

      toast({
        title: "User created successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });

      setUser({ name: "", email: "", password: "" });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setUser({ name: "", email: "", password: "" });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={handleInputChange}
        />
      </FormControl>
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
        type="submit"
        isLoading={loading}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
