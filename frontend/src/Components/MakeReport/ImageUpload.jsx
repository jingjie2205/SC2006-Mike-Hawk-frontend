import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import {
  Box,
  Text,
  Input,
  Button,
  Image,
  Link,
  Textarea,
} from "@chakra-ui/react";

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Store the image file in state
      setImage(URL.createObjectURL(file));
    }
  };

  // Function to handle image removal
  const removeImage = () => {
    setImage(null); // Clear the image from state
  };
  return (
    <Box textAlign="center" p={4}>
      {/* file selector */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        mb={4}
        variant="unstyled"
      />
      <Box
        w="400px"
        h="300px"
        borderWidth={image ? "" : "2px"}
        borderStyle={image ? "solid" : "dashed"}
        borderColor={image ? "gray.300" : "gray.400"}
        borderRadius="md"
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
      >
        {/* camera icon */}
        {!image && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GrGallery size={50} />
            <Text color="gray.400">Upload Image</Text>
          </div>
        )}
        {/* view selected image */}
        {image && (
          <Image
            src={image}
            objectFit="fill"
            borderRadius="md"
            mb={4}
            w="1000px"
            h="400px"
          />
        )}
      </Box>
      <Button colorScheme="red" onClick={removeImage}>
        Remove Image
      </Button>
    </Box>
  );
}

export default ImageUpload;
