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

function NavBar() {
    const isAuthority = parseInt(localStorage.getItem("isAuthority"), 10); // Fetch isAuthority from local storage

    return (
        <Box
            bg="gray.800"
            width="100vw" // Limits the width of the navbar
            mt={4} // Adds top margin for spacing
            py={2} // Adds some padding for vertical spacing
            shadow="md"
        >
            <Flex>
                <HStack ml="5%" mr="5%" width="90%" justify="space-between">
                    <Image
                        src="/RQ.png"
                        alt="ReportQuest Logo"
                        height="50"
                        rounded="50%"
                    />
                    {/* Navigation Links */}
                    <Tooltip label="Dashboard">
                        <Link as={RouterLink} to="/userdashboard">
                            <IoHomeOutline size={30} color="white" />
                        </Link>
                    </Tooltip>

                    {isAuthority === 0 && (
                        <>
                            <Tooltip label="Make Report">
                                <Link as={RouterLink} to="/makereport">
                                    <GoReport size={30} color="white" />
                                </Link>
                            </Tooltip>

                            <Tooltip label="Rewards">
                                <Link as={RouterLink} to="/myrewards">
                                    <IoGiftOutline size={30} color="white" />
                                </Link>
                            </Tooltip>
                        </>
                    )}

                    <Tooltip label="My Reports">
                        {isAuthority ? (
                            <Link as={RouterLink} to="/authoritymyreports">
                                <IoFileTrayFullOutline
                                    size={30}
                                    color="white"
                                />
                            </Link>
                        ) : (
                            <Link as={RouterLink} to="/myreports">
                                <IoFileTrayFullOutline
                                    size={30}
                                    color="white"
                                />
                            </Link>
                        )}
                    </Tooltip>
                    <Tooltip label="Profile">
                        <Link as={RouterLink} to="/profile">
                            <FaUserCircle size={30} color="white" />
                        </Link>
                    </Tooltip>
                </HStack>
            </Flex>
        </Box>
    );
}

export default NavBar;
