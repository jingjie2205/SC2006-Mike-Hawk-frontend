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
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  IoHomeOutline,
  IoGiftOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { MdManageSearch } from "react-icons/md";
import { TbAlertSquare } from "react-icons/tb";

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
      <Flex alignItems="center" justifyContent="space-between">
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
          <HStack as="nav" spacing={6} alignItems="center">
            <Tooltip label="Dashboard">
              <Link as={RouterLink} to="/userdashboard">
                <IoHomeOutline size={30} color="white" />
              </Link>
            </Tooltip>
            <Tooltip label="Make Report">
              <Link as={RouterLink} to="/makereport">
                <GoReport size={30} color="white" />
              </Link>
            </Tooltip>
            <Tooltip label="Rewards">
              <Link as={RouterLink} to="/rewards">
                <IoGiftOutline size={30} color="white" />
              </Link>
            </Tooltip>
            <Tooltip label="My Reports">
              <Link as={RouterLink} to="/myreports">
                <IoFileTrayFullOutline size={30} color="white" />
              </Link>
            </Tooltip>
            <Divider orientation="vertical" color={"whiteAlpha.400"} />
            <Tooltip label="Manage">
              <Link as={RouterLink} to="/adminmanagement">
                <MdManageSearch size={30} color="white" />
              </Link>
            </Tooltip>
            <Tooltip label="Review">
              <Link as={RouterLink} to="/dashboard">
                <TbAlertSquare size={30} color="white" />
              </Link>
            </Tooltip>
          </HStack>
        </HStack>

        <Spacer />
        <Box>
          <Link as={RouterLink} to="/profile">
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
