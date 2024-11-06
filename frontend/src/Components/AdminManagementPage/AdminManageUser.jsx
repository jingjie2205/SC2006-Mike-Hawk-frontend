import React, { useState, useEffect } from "react";
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
  Button
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function AdminManageUser() {
  // const [users, setUsers] = useState([
  //   { id: 1, username: "Aaron", email: "aaron@example.com" },
  //   { id: 2, username: "Allen", email: "allen@example.com" },
  //   { id: 3, username: "David", email: "david@example.com" },
  //   { id: 4, username: "Anna", email: "anna@example.com" },
  //   { id: 5, username: "Amanda", email: "amanda@example.com" }
  // ]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false); // State to track delete confirmation


  // Function to fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/users/all"); // Backend endpoint for users
  
        if (response.status === 200) {
          console.log(response.data)
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect to handle debouncing - updates the debounced term after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 900); 

    return () => clearTimeout(timer); // Clean up timeout if user types again before 2 seconds
  }, [searchTerm]); // Runs whenever searchTerm changes

  // Filter users based on the search term (case insensitive)
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Open modal to edit selected user
  const openModal = (user) => {
    console.log("Opening modal for user:", user); // Check the user object here
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Save changes made in modal
  const handleSaveChanges = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );
    closeModal();
  };
   // Delete user with confirmation
   const handleDeleteClick = () => {
    setIsDeleteConfirm(true); // Show the second confirmation step
  };

  // Delete user
  const handleDelete = async () => {
    try {
      // Send DELETE request to backend
      const response = await axios.delete(`http://127.0.0.1:8000/users/users/?user_id=${selectedUser?.userID}`);
  
      if (response.status === 200) {
        // Successfully deleted, now update the local state to remove the user
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser?.userID));
        closeModal();  // Close the modal after deletion
        window.location.reload()
      }
      else {
        console.error("Failed to delete user: ", response);
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user", error);
      // Optionally, you can show a toast message or alert here
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
        <Thead>
          <Tr>
            <Th>User Name</Th>
            <Th>Email Address</Th>
          </Tr>
        </Thead>
          <Tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Tr key={user.id} onClick={() => openModal(user)} _hover={{ bg: "gray.100", cursor: "pointer" }}>
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
              name="username"
              value={selectedUser?.username || ""}
              onChange={handleInputChange}
              placeholder="Enter new username"
              mb={4}
            />
            <Text mb="8px">Current Email: {selectedUser?.emailAddress}</Text>
            <Input
              name="email"
              value={selectedUser?.email || ""}
              onChange={handleInputChange}
              placeholder="Enter new email"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Save
            </Button>
            {!isDeleteConfirm ? (
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Delete
              </Button>
            ) : (
              <>
                <Button colorScheme="red" mr={3} onClick={handleDelete}>
                  Confirm Delete
                </Button>
              </>
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
