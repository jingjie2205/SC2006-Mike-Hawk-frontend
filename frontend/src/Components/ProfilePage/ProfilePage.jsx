import React from "react";
import NavBar from "../../Common/NavBar";

import { Box, Button, Flex, Avatar, Text, Input, VStack, IconButton, Image} from "@chakra-ui/react";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <h1>Profile Page</h1>
      <Flex
        bg="#06ADBF"
        p={4}
        align="center"
        width="100vw"
        >
        <Text fontWeight="1000" fontSize="100%" align="left" color="white">Hello, John!</Text>
        
        <Image float='right' align="right" margin="2% 0px 2% 60%" boxSize='10%' borderRadius="50%" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />      
      </Flex>
      <Box>
            <VStack spacing={4}>
                <Box
                    bg="#F2F2F2"
                    p="3%"
                    borderRadius="md"
                    width="70%"
                    textAlign="left"
                    mt={10}
                    mb={5}
                >
                    <Text fontWeight="bold" color="black" mb={2} >Username: John123</Text>
                    <Text fontWeight="bold" color="black" mb={10}>Email: John123@gmail.com</Text>
                    <Button ml="65%" fontWeight="800" background="#06ADBF" color='white' width="30%">
                        Update
                    </Button>
                    
            </Box>

            <Button fontWeight="800" mb={5} background="#06ADBF" color='white' width="66%">
                Reset password
            </Button>
            <Button fontWeight="800" mb={5} background="#06ADBF" color='white' width="66%">
                Feedback
            </Button>
            <Button fontWeight="800" mb={5} background="#06ADBF" color='white' width="66%">
                Log Out
            </Button>
            </VStack>
        </Box>
    </div>
  );
}

export default ProfilePage;
