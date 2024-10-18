import React, { useState } from "react";
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
  ]);

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
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
            </Tr>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminManageUser;
