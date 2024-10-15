import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import "./RewardsCard.css";

function RewardsCard({ image, name, points, amount, userPoints }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const handleRedemption = () => {
    if (userPoints >= points) {
      toast({
        title: "Redemption Successful!",
        description: `You have redeemed ${name} voucher for ${points} points!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Insufficient Points",
        description: "You do not have enough points to redeem this reward!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <>
      <Card
        as="button"
        width={"500px"}
        height={"200px"}
        className="rewards-card"
        onClick={onOpen}
      >
        <CardBody
          width={"500px"}
          height={"200px"}
          display="flex"
          alignItems={"center"}
        >
          <Image
            src={image}
            width="100px"
            height="90px"
            rounded={3}
            alignContent={"center"}
          />
          <Box
            justifyContent="space-between"
            width={"500px"}
            className="text-container"
          >
            <Text>{name}</Text>
            <Text>${amount} evoucher</Text>
            <Text>{points} points</Text>
          </Box>
        </CardBody>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Redemption
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to redeem this reward for {points} points?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleRedemption} ml={3}>
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
