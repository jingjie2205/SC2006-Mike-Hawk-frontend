import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import { Link as RouterLink } from "react-router-dom";

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

function LoginForm() {
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
