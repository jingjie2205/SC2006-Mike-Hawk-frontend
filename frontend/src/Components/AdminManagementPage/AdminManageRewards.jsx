import { React, useState, useRef } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  useDisclosure,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import RewardsCard from "../RewardsPage/RewardsCard";

function AdminManageRewards() {
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    points: "",
    amount: "", // Hardcoded for now, you can make this a form field too
  });
  const { onOpen, onClose, isOpen } = useDisclosure();

  {
    /* HARD CODED FOR TESTING */
  }
  const [vouchers, setVouchers] = useState([
    { image: "../../public/macs.png", name: "Macs", points: 100, amount: 10 },
    {
      image: "../../public/fairprice.png",
      name: "FairPrice",
      points: 150,
      amount: 10,
    },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setNewVoucher((prevVoucher) => ({ ...prevVoucher, [name]: value }));
  };

  const handleSave = () => {
    if (newVoucher.name && newVoucher.points) {
      setVouchers([...vouchers, newVoucher]); // Add new voucher to list
      setNewVoucher({ name: "", description: "", points: "", amount: 10 }); // Reset form
      onClose(); // Close the Popover
    }
  };

  const updateVoucher = (index, updatedVoucher) => {
    const updatedVouchers = [...vouchers];
    updatedVouchers[index] = { ...updatedVouchers[index], ...updatedVoucher };
    setVouchers(updatedVouchers);
  };

  return (
    <div>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="blue" padding={5}>
            Add Voucher
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock>
            <PopoverArrow />
            <PopoverCloseButton />
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Voucher Name</FormLabel>
                <Input
                  name="name"
                  onChange={handleInputChange}
                  value={newVoucher.name}
                />
                <FormLabel>Voucher Amount</FormLabel>
                <Input
                  name="amount"
                  onChange={handleInputChange}
                  value={newVoucher.amount}
                  type="number"
                />
                <FormLabel>Points Required</FormLabel>
                <Input
                  name="points"
                  onChange={handleInputChange}
                  value={newVoucher.points}
                  type="number"
                />
              </FormControl>
              <ButtonGroup display="flex" justifyContent="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={handleSave}
                  isDisabled={!newVoucher.name || !newVoucher.points}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
      <div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
        padding="20px"
      >
        {/* HARD CODED FOR TESTING */}
        {vouchers.map((reward, index) => (
          <RewardsCard
            key={index}
            image={reward.image}
            name={reward.name}
            points={reward.points}
            amount={reward.amount}
            isAdmin={true}
            onUpdate={(updatedVoucher) => updateVoucher(index, updatedVoucher)} // Pass update function
          />
        ))}
      </div>
    </div>
  );
}

export default AdminManageRewards;
