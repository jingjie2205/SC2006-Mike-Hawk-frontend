import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

function ReportItem({ report, onClick }) {
  console.log(report.image_path);

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
        src={report.image_path}
        alt="Report"
      />
      <Text align="left" fontWeight="500" fontSize="150%" color="black">
        {report.title}
      </Text>
      <Text align="left" fontWeight="500" fontSize="80%" color="black">
        Date: {report.datetime}
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
