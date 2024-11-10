import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../config";
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
import { BsThreeDotsVertical } from "react-icons/bs";
import "./RewardsCard.css";

function RewardsCard({
  rewardID,
  description,
  pointsRequired,
  validity,
  availability,
  userPoints,
  isAdmin,
  onUpdate,
}) {
  const [image, setImage] = useState(""); // State to store the fetched image URL
  const userId = localStorage.getItem("userId"); // Fetch userId from local storage

  const {
    isOpen: isRedemptionOpen,
    onOpen: onRedemptionOpen,
    onClose: onRedemptionClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const [editedVoucher, setEditedVoucher] = useState({
    description: description,
    pointsRequired: pointsRequired,
    availability: availability,
  });

  const handleRedemption = async () => {
    try {
      // post the request to redeem reward to the backend
      const response = await axios.post(
        `${config.baseURL}/rewards/rewards/claim/${rewardID}?user_id=${userId}`
      );

      if (response.status === 200) {
        toast({
          title: "Redemption Successful!",
          description: `You have redeemed ${description} for ${pointsRequired} points!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onRedemptionClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response.status === 403) {
        toast({
          title: "Insufficient Points",
          description: "You do not have enough points to redeem this reward!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        onRedemptionClose();
      } else {
        throw new Error("Failed to redeem");
      }
    } catch (error) {
      console.error("Error updating points:", error);
      toast({
        title: "Redemption Failed",
        description:
          "There was an error updating your points. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onRedemptionClose();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedVoucher((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the reward details
      const response = await axios.put(
        `${config.baseURL}/rewards/rewards/update/${rewardID}`,
        {
          description: editedVoucher.description,
          pointsRequired: editedVoucher.pointsRequired,
          validity: 999,
          availability: 999,
        }
      );

      if (response.status === 200) {
        // Show success toast
        toast({
          title: "Update Successful!",
          description: "The reward details have been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onUpdate();
        // Close the edit popover
        onEditClose();
      } else {
        throw new Error("Failed to update reward details.");
      }
    } catch (error) {
      console.error("Error updating reward:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the reward. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Fetch image URL based on rewardId
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/rewards/rewards/${rewardID}/image`,
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
    <>
      <Card
        as={!isAdmin ? "button" : undefined}
        width={"100%"}
        height={"200px"}
        className="rewards-card"
        onClick={!isAdmin ? onRedemptionOpen : undefined}
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
            <Text>{description}</Text>
            <Text>{pointsRequired} Points</Text>
          </Box>
          {isAdmin && (
            <Popover
              isOpen={isEditOpen}
              onOpen={onEditOpen}
              onClose={onEditClose}
              placement="right"
            >
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<BsThreeDotsVertical />}
                  onClick={(e) => e.stopPropagation()}
                />
              </PopoverTrigger>
              <PopoverContent p={4}>
                <FocusLock>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input
                        name="description"
                        value={editedVoucher.description}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Points Required</FormLabel>
                      <Input
                        name="pointsRequired"
                        type="number"
                        value={editedVoucher.pointsRequired}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                    <Button colorScheme="teal" onClick={handleUpdate}>
                      Update
                    </Button>
                  </Stack>
                </FocusLock>
              </PopoverContent>
            </Popover>
          )}
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isRedemptionOpen}
        leastDestructiveRef={cancelRef}
        onClose={onRedemptionClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Redemption
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to redeem this reward for {pointsRequired}{" "}
              points?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onRedemptionClose}>
                No
              </Button>
              <Button colorScheme="green" onClick={handleRedemption} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default RewardsCard;
