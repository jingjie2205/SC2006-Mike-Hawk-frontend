import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Image } from "@chakra-ui/react";
import config from "../../config";

function ReportItem({ report, onClick }) {
  const reportID = report.report_id;
  const [image, setImage] = useState(""); // State to store the fetched image URL
  const dateTime = new Date(report.datetime * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const formattedDate = dateTime.toLocaleString(); // Default locale and time format

  useEffect(() => {
    // Fetch image URL based on reportId
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/reports/reports/reportPicture/${reportID}`,
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
  }, [reportID]);

  return (
    <Box
      onClick={onClick}
      key={report.report_id}
      bg="#dddddd"
      alignItems="center"
      w="80%"
      mb="5%"
      padding="2.3%"
    >
      <Image
        mt="1%"
        mr="3%"
        boxSize="30%"
        float="left"
        src={image}
        alt="Report"
      />
      <Text align="left" fontSize="100%" fontWeight="bold" color="black">
        {report.title}
      </Text>
      <Text align="left" fontSize="80%" color="black">
        Time: {formattedDate}
      </Text>
      <Text
        mt="5%"
        align="left"
        fontWeight="500"
        fontSize="100%"
        color="black"
        padding="0.5%"
      >
        {report.description}
      </Text>
    </Box>
  );
}

export default ReportItem;
