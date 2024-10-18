import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Link,
  border,
} from "@chakra-ui/react";

const retrievePosts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/public/public/login");
  return response.data;
};

function LoginForm() {
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/public/public/login",
        {
          username: "jinjie1",
          password: "password1",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mx="auto"
        border={["none", "1px solid #e8e8e8"]}
        borderColor={["", "gray.200"]}
        borderRadius={10}
        boxShadow="md"
        rounded="md"
        bg="white"
      >
        <Image src="./public/RQ.png" alt="ReportQuest Logo" rounded={10} />
        <FormControl>
          <FormLabel htmlFor="Username">Username</FormLabel>
          <div class="wrapper">
            <Input id="username" type="username" rounded={20} />
            <FaUser class="icon" />
          </div>
          <FormLabel htmlFor="Password">Password</FormLabel>
          <div class="wrapper">
            <Input id="password" type="password" rounded={20} />
            <FaLock class="icon" />
          </div>
          <Button
            borderRadius={20}
            type="submit"
            variant="solid"
            colorScheme="blue"
            width="full"
          >
            Login
          </Button>
          <div>
            <FormLabel htmlFor="register" textAlign={"center"}>
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="blue.400"
                _hover={{ color: "blue.600" }}
              >
                Register
              </Link>
            </FormLabel>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}

export default LoginForm;
