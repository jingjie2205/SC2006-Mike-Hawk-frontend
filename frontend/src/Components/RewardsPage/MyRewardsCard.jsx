import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Text,
  Image,
  CardBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function MyRewardsCard({ rewardID, expiry, giftcode }) {
  const [image, setImage] = useState(""); // State to store the fetched image URL
  const [reward, setReward] = useState([]);
  const userId = localStorage.getItem("userId"); // Fetch userId from local storage

  // Fetch rewards from the database
  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/rewards/rewards/${rewardID}`
        );
        if (response.status === 200) {
          setReward(response.data);
          const description = reward.description;
        }
      } catch (err) {
        console.error("Error fetching rewards:", err);
        setError("Failed to fetch rewards. Please try again later.");
      }
    };
    fetchReward();
  }, [rewardID]);

  useEffect(() => {
    // Fetch image URL based on rewardId
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/rewards/rewards/${description}/image`,
          {
            responseType: "blob",
          }
        );
        // Check if content is an image
        if (response.headers["content-type"].includes("image/png")) {
          // Convert blob to an object URL
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
  }, [rewardID]);

  return (
    <Card
      width={"100%"}
      height={"200px"}
      className="rewards-card"
      backgroundColor="#dddddd"
      mb="5%"
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
        />
        <Box
          justifyContent="space-between"
          width={"500px"}
          className="text-container"
        >
          <Text>{reward.description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
}

export default MyRewardsCard;
