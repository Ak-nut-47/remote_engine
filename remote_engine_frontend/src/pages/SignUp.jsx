import React, { useState } from "react";
import {
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { RiMailFill, RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = () => {
    axios
      .post("http://localhost:3001/developer/signup", formData)
      .then((response) => {
        setFormData({
          email: "",
          password: "",
        });
        if (response?.data.user.email) {
          toast({
            title: "Account Created",
            description: `Welcome, ${response?.data?.user.email}!`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        return toast({
          title: "Error",
          description: `${error.response.data.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Flex
      direction={"column"}
      gap={30}
      backgroundColor="white"
      boxShadow="0px 0px 10px rgba(85, 107, 47, 0.5)"
      padding={{ base: "10px", md: "20px" }}
      width={{ base: "80%", md: "300px", lg: "500px" }}
      margin="auto"
      borderRadius="5px"
      minH={"50vh"}
      mt={50}
    >
      <Flex direction={"column"} alignItems={"flex-start"}>
        <Heading color="maroon" fontWeight="bold" mb={{ base: "2", md: "4" }}>
          Sign Up
        </Heading>
        <Text color="#555" mb={{ base: "2", md: "4" }}>
          Create an account to get started
        </Text>
      </Flex>

      <Flex direction="column">
        <Flex alignItems="center" mb="3">
          <Icon as={RiMailFill} color="olive" mr="2" />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Flex>
        <Flex alignItems="center" mb="3">
          <Icon as={RiLockPasswordFill} color="olive" mr="2" />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Flex>
        <br />

        <Button
          backgroundColor="maroon"
          color="white"
          _hover={{ backgroundColor: "darkred" }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <br />
        <br />
        <br />
        <Text color="#555" mb={{ base: "2", md: "4" }}>
          Already have an account?{" "}
          <b>
            <Text color="#808000">
              {" "}
              <Link to="/">Sign In</Link>
            </Text>
          </b>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
