import React, { useState } from "react";
import NavBar from "../../Common/NavBar";
import {
  Box,
  Text,
  Input,
  VStack,
  IconButton,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SortBy from "./SortBy";

// Sample report data
const reports = [
  {
    id: 1,
    title: "Spoilt fire alarm at Jurong Point",
    description: "Spoilt fire alarm at Jurong Point Level B1 near mens toilet",
    image: "src/Assets/FireAlarm.jpg",
    isActive: true,
    Datetime: "5:30 PM, 3rd Sept 2024",
  },
  {
    id: 2,
    title: "Pothole at Tampines Street 81",
    description: "Pothole at Tampines Street 81 beside block 824",
    image: "src/Assets/pothole.jpg",
    isActive: false,
    Datetime: "1:30pm 30th Aug 2024",
  },
  {
    id: 3,
    title: "Aircon leak at Sengkang Interchange",
    description:
      "Aircon leak at Sengkang Interchange causing puddling, fall hazard",
    image: "src/Assets/AirconLeakage.webp",
    isActive: false,
    Datetime: "5:00pm 12th May 2023",
  },
];

function UserMyReport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);
  const [sortOption, setSortOption] = useState("Most recent");

  // Function to handle the search action when the icon is clicked
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setFilteredReports(
        reports.filter((report) =>
          report.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredReports(reports);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const reportsToRender = filteredReports;

  return (
    <div>
      <NavBar />

      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          My Reports
        </Text>
      </VStack>
      <HStack alignItems="center" mt="3%" position={"sticky"} m="3%" p="10px">
        <Input
          onKeyDown={handleKeyDown}
          placeholder="Search For Your Reports"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          height={45}
          borderRadius={25}
          backgroundColor="#D3D3D3"
          ml="3%"
        />
        <IconButton
          onClick={handleSearch}
          aria-label="Search"
          icon={<FaSearch />}
          fontSize="200%"
          background="white"
          color="grey"
          paddingRight="2%"
        />
      </HStack>
      <HStack justifyContent={"space-between"} width="100%">
        <SortBy sortOption={sortOption} onSortChange={handleSortChange} />
        <Text
          fontSize="110%"
          textDecor={"underline"}
          textAlign="right"
          mr="10%"
          onClick={() => {
            setSearchQuery(""); // Clear search input
            setFilteredReports(reports);
            // Optionally: you may want to also trigger a function that fetches all reports if needed
          }}
          cursor="pointer" // Change cursor to pointer for better UX
        >
          Show all reports
        </Text>
      </HStack>

      <Text
        fontWeight="500"
        mb="2%"
        fontSize="250%"
        align="center"
        color="black"
        borderRadius={40}
      >
        Active Reports
      </Text>

      <VStack bg="white" align="center">
        {reportsToRender.filter((report) => report.isActive).length === 0 ? (
          <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
            <Text fontWeight={"400"} fontSize={"120%"}>
              No reports found
            </Text>
          </Box>
        ) : (
          reportsToRender
            .filter((report) => report.isActive)
            .map((report) => (
              <Box
                key={report.id}
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
                  src={report.image}
                  alt="Report"
                />
                <Text
                  align="left"
                  fontWeight="500"
                  fontSize="150%"
                  color="black"
                >
                  {report.title}
                </Text>
                <Text
                  align="left"
                  fontWeight="500"
                  fontSize="80%"
                  color="black"
                >
                  Date & time: {report.Datetime}
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
            ))
        )}
      </VStack>

      <Text
        fontWeight="500"
        mt="1%"
        mb="2%"
        fontSize="250%"
        align="center"
        color="black"
      >
        Past Reports
      </Text>
      <VStack bg="white" align="center">
        {reportsToRender.filter((report) => !report.isActive).length === 0 ? (
          <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
            <Text fontWeight={"400"} fontSize={"120%"}>
              No reports found
            </Text>
          </Box>
        ) : (
          reportsToRender
            .filter((report) => !report.isActive)
            .map((report) => (
              <Box
                key={report.id}
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
                  src={report.image}
                  alt="Report"
                />
                <Text
                  align="left"
                  fontWeight="500"
                  fontSize="150%"
                  color="black"
                >
                  {report.title}
                </Text>
                <Text
                  align="left"
                  fontWeight="500"
                  fontSize="80%"
                  color="black"
                >
                  Date & time: {report.Datetime}
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
            ))
        )}
      </VStack>
    </div>
  );
}

export default UserMyReport;
