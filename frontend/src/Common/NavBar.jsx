import { useState } from "react";
import {
  Flex,
  Box,
  Link,
  Button,
  HStack,
  Spacer,
  Image,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <Box
      bg="gray.800"
      px={10}
      maxWidth="1200px" // Limits the width of the navbar
      borderRadius="20px" // Makes the navbar rounded
      mx="auto" // Centers the navbar horizontally
      mt={4} // Adds top margin for spacing
      py={2} // Adds some padding for vertical spacing
      shadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Image
              src="/RQ.png"
              alt="ReportQuest Logo"
              width="50px"
              height="50px"
              rounded={3}
            />
          </Box>

          {/* Navigation Links */}
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link
              as={RouterLink}
              to="/login"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              Login
            </Link>
            <Link
              as={RouterLink}
              to="/register"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              Register
            </Link>
            <Link
              as={RouterLink}
              to="/userdashboard"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              User Dashboard
            </Link>
            <Link
              as={RouterLink}
              to="/makereport"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              Make Report
            </Link>
            <Link
              as={RouterLink}
              to="/rewards"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              Rewards
            </Link>
            <Link
              as={RouterLink}
              to="/myreports"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              My Reports
            </Link>
            <Divider orientation="vertical" />
            <Link
              as={RouterLink}
              to="/adminmanagement"
              _hover={{ color: "blue.600" }}
              color={"white"}
            >
              Admin Management
            </Link>
          </HStack>
        </HStack>

        <Spacer />
        <Box>
          <Link as={RouterLink} to="/profile" _hover={{ color: "blue.600" }}>
            <Button bg="transparent" _hover={{ bg: "gray.800" }}>
              <FaUserCircle size={30} color="white" />
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
