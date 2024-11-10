import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  Box,
  Card,
  Text,
  Image,
  CardBody,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { QRCode } from "react-qrcode-logo";

function MyRewardsCard({ rewardID, expiry, giftcode }) {
  const [image, setImage] = useState(""); // State to store the fetched image URL
  const [reward, setReward] = useState({});
  const [error, setError] = useState(""); // State to store error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const toast = useToast();

  // Fetch reward details from the database
  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/rewards/rewards/${rewardID}`
        );
        if (response.status === 200) {
          setReward(response.data);
        }
      } catch (err) {
        console.error("Error fetching reward details:", err);
        setError("Failed to fetch reward details. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch reward details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchReward();
  }, [rewardID]);

  // Fetch image URL based on reward description
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/rewards/rewards/${rewardID}/image`,
          { responseType: "blob" }
        );
        if (response.headers["content-type"].includes("image/png")) {
          const imageUrl = URL.createObjectURL(response.data);
          setImage(imageUrl);
        } else {
          console.error("Fetched content is not an image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [reward.description]);

  // Convert expiry date from Unix timestamp
  const convertExpiry = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Open the modal to display the QR code
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        width={"100%"}
        height={"200px"}
        className="rewards-card"
        backgroundColor="#dddddd"
        mb="5%"
        onClick={handleCardClick} // Trigger modal on card click
      >
        <CardBody
          width={"100%"}
          height={"200px"}
          display="flex"
          alignItems={"center"}
        >
          <Image
            src={image || "default-image-url.png"} // Use a default image if none provided
            width="100px"
            height="90px"
            rounded={3}
            alignContent={"center"}
            ml="3%"
            alt={reward.description || "Reward Image"}
          />
          <Box
            justifyContent="space-between"
            width={"500px"}
            className="text-container"
          >
            <Text>{reward.description || "Reward Description"}</Text>
            <Text fontSize="md">
              Expiry: {expiry ? convertExpiry(expiry) : "No Expiry"}
            </Text>
          </Box>
        </CardBody>
      </Card>

      {/* Modal to display QR code */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent width="80%" maxWidth="80%">
          <ModalHeader>Gift Code QR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <QRCode value={giftcode || "No Gift Code Available"} size={256} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyRewardsCard;
