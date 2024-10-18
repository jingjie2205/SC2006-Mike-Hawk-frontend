import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  VStack,
  IconButton,
  Image,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function AdminManageUser() {
  const [users, setUsers] = useState([
    { id: 1, username: "Aaron" },
    { id: 2, username: "Allen" },
    { id: 3, username: "David" },
    { id: 4, username: "Anna" },
    { id: 5, username: "Amanda" }
  ]);
  
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // State for debounced search term

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect to handle debouncing - updates the debounced term after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 900); // 2-second delay

    return () => clearTimeout(timer); // Clean up timeout if user types again before 2 seconds
  }, [searchTerm]); // Runs whenever searchTerm changes

  // Filter users based on the search term (case insensitive)
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div>
      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          Admin Dashboard
        </Text>
      </VStack>

      <HStack alignItems="center" mt="3%">
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          fontSize="200%"
          background="white"
          color="grey"
          padding="5%"
        />
        <Input
          placeholder="Search For User"
          height={45}
          borderRadius={25}
          backgroundColor="#D3D3D3"
          border-color="black"
          mr="3%"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </HStack>

      <Text
        fontWeight="500"
        mt="3%"
        ml="5%"
        mb="3%"
        fontSize="100%"
        align="left"
        color="black"
      >
        User List:
      </Text>

      <TableContainer>
        <Table variant="simple">
        <Tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.username}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="2">No users found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminManageUser;
