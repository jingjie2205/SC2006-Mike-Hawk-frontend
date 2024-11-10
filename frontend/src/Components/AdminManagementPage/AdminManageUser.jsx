import React, { useState, useEffect } from "react";
import config from "../../config";
import axios from "axios";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function AdminManageUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/users/users/all`);
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // Search input change handling
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Debouncing search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Reduced to 500ms for faster response
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtered users list
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Modal handling functions
  const openModal = (user) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Delete user confirmation
  const handleDeleteClick = () => setIsDeleteConfirm(true);

  // Delete user
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/users/users/?user_id=${selectedUser?.userID}`
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userID !== selectedUser?.userID)
        );
        closeModal();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Update user
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        userName: selectedUser.userName,
        emailAddress: selectedUser.emailAddress,
      };

      const response = await axios.put(
        `${config.baseURL}/users/users/${selectedUser.userID}/update/`,
        updatedUser
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID === selectedUser.userID
              ? { ...user, ...updatedUser }
              : user
          )
        );
        closeModal();
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div>
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
          placeholder="Search for User by Username"
          height={45}
          borderRadius={25}
          backgroundColor="#D3D3D3"
          borderColor="black"
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
          <Thead>
            <Tr>
              <Th>User Name</Th>
              <Th>Email Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Tr
                  key={user.userID}
                  onClick={() => openModal(user)}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                >
                  <Td>{user.userName}</Td>
                  <Td>{user.emailAddress}</Td>
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="8px">Current Username: {selectedUser?.userName}</Text>
            <Input
              name="userName"
              value={selectedUser?.userName || ""}
              onChange={handleInputChange}
              placeholder="Enter new username"
              mb={4}
            />
            <Text mb="8px">Current Email: {selectedUser?.emailAddress}</Text>
            <Input
              name="emailAddress"
              value={selectedUser?.emailAddress || ""}
              onChange={handleInputChange}
              placeholder="Enter new email"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Save
            </Button>
            {!isDeleteConfirm ? (
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Delete
              </Button>
            ) : (
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Confirm Delete
              </Button>
            )}
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminManageUser;
