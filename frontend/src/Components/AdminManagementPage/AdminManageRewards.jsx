import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import RewardsCard from "../RewardsPage/RewardsCard";
import ImageUpload from "../MakeReport/ImageUpload";

function AdminManageRewards() {
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    points: "",
    image: null,
  });
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [vouchers, setVouchers] = useState([]);
  const toast = useToast();
  const userID = localStorage.getItem("userId");

  // Fetch vouchers from the backend
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/rewards/rewards/all"
        );
        if (response.status === 200) {
          const sortedVouchers = response.data.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
          setVouchers(sortedVouchers);
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher((prevVoucher) => ({ ...prevVoucher, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (image) => {
    setNewVoucher((prevVoucher) => ({ ...prevVoucher, image }));
  };

  // Handle save operation, accepting inputs as parameters
  const handleSave = async (name, points, image) => {
    if (name && points) {
      try {
        // If the image exists, upload it first and get the URL
        const formData = new FormData();
        formData.append("file", image);
        if (image) {
          const imageResponse = await axios.post(
            "http://127.0.0.1:8000/rewards/upload_image", // Assume this is the endpoint for uploading images
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (imageResponse.status === 200) {
            imageUrl = imageResponse.data.imageUrl; // assuming the image URL is returned
          }
        }

        // Send the new voucher details as query parameters
        const response = await axios.post(
          `http://127.0.0.1:8000/rewards/rewards?description=${name}&pointsRequired=${points}&availability=999&validity=999&userID=${userID}`,
        );

        if (response.status === 201) {
          // After saving, re-fetch the vouchers to show the new one
          const fetchResponse = await axios.get(
            "http://127.0.0.1:8000/rewards/rewards/all"
          );
          if (fetchResponse.status === 200) {
            const sortedVouchers = fetchResponse.data.sort((a, b) =>
              a.description.localeCompare(b.description)
            );
            setVouchers(sortedVouchers); // Update the vouchers state with the latest data
          }

          // Display toast for successful update
          toast({
            title: "Voucher Added.",
            description: "The new voucher has been successfully added.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }

        setNewVoucher({ name: "", points: "", image: null }); // Clear after saving
        onClose(); // Close modal after saving
      } catch (error) {
        console.error("Error saving voucher:", error);
      }
    }
  };

  // Define the onUpdate function to re-fetch the vouchers after an update
  const onUpdate = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/rewards/rewards/all"
      );
      if (response.status === 200) {
        const sortedVouchers = response.data.sort((a, b) =>
          a.description.localeCompare(b.description)
        );
        setVouchers(sortedVouchers); // Update the vouchers state with the latest data
      }
    } catch (error) {
      console.error("Error re-fetching vouchers:", error);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <Button colorScheme="blue" padding={5} mb="2%" onClick={onOpen}>
        Add Voucher
      </Button>

      {/* Modal for adding a voucher */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Voucher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Voucher Name</FormLabel>
                <Input
                  name="name"
                  onChange={handleInputChange}
                  value={newVoucher.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Points Required</FormLabel>
                <Input
                  name="points"
                  onChange={handleInputChange}
                  value={newVoucher.points}
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Voucher Image</FormLabel>
                <ImageUpload onImageUpload={handleImageUpload} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => handleSave(newVoucher.name, newVoucher.points, newVoucher.image)}
              isDisabled={!newVoucher.name || !newVoucher.points}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        paddingTop={"20px"}
        align="center"
      >
        {vouchers.map((reward) => (
          <RewardsCard
            key={reward.rewardID}
            rewardID={reward.rewardID}
            description={reward.description}
            pointsRequired={reward.pointsRequired}
            validity={reward.validity}
            isAdmin={true}
            availability={reward.availability}
            onUpdate={onUpdate}
          />
        ))}
      </Box>
    </div>
  );
}

export default AdminManageRewards;
