import React, { useState, useMemo } from "react";
import NavBar from "../../Common/NavBar";
import {
  Box,
  Text,
  Input,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SortBy from "../UserMyReport/SortBy";
import ReportItem from "../UserMyReport/ReportItem";

// Sample report data
const reports = [
  {
    id: 1,
    title: "Spoilt fire alarm at Jurong Point",
    description: "Spoilt fire alarm at Jurong Point Level B1 near men's toilet",
    image: "src/Assets/FireAlarm.jpg",
    isActive: true,
    Date: "2024-09-03",
    severity: 5
  },
  {
    id: 2,
    title: "Pothole at Tampines Street 81",
    description: "Pothole at Tampines Street 81 beside block 824",
    image: "src/Assets/pothole.jpg",
    isActive: false,
    Date: "2024-08-30",
    severity: 6
  },
  {
    id: 3,
    title: "Aircon leak at Sengkang Interchange",
    description: "Aircon leak at Sengkang Interchange causing puddling, fall hazard",
    image: "src/Assets/AirconLeakage.webp",
    isActive: false,
    Date: "2023-05-10",
    severity: 3
  },
];

function UserMyReport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);
  const [sortOption, setSortOption] = useState("Newest");

  const handleSearch = () => {
    setFilteredReports(
      searchQuery.trim()
        ? reports.filter((report) =>
            report.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : reports
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedReports = useMemo(() => {
    const sortReports = [...filteredReports];
    if (sortOption === "Most recent") {
      return sortReports.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    }
    if (sortOption === "Oldest") {
      return sortReports.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    }
    if (sortOption === "Most Severe") {
      return sortReports.sort((a, b) => b.severity - a.severity);
    }
    
    if (sortOption === "Least Severe") {
      return sortReports.sort((a, b) => a.severity - b.severity);
    }
    
    return sortReports;
  }, [filteredReports, sortOption]);

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
          onChange={(e) => setSearchQuery(e.target.value)}
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
            setSearchQuery(""); 
            setFilteredReports(reports);
          }}
          cursor="pointer"
        >
          Show all reports
        </Text>
      </HStack>

      <Text fontWeight="500" mb="2%" fontSize="250%" align="center" color="black">
        Active Reports
      </Text>

      <VStack bg="white" align="center">
        {sortedReports.filter((report) => report.isActive).length === 0 ? (
          <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
            <Text fontWeight={"400"} fontSize={"120%"}>
              No reports found
            </Text>
          </Box>
        ) : (
          sortedReports
            .filter((report) => report.isActive)
            .map((report) => <ReportItem key={report.id} report={report} />)
        )}
      </VStack>

      <Text fontWeight="500" mt="1%" mb="2%" fontSize="250%" align="center" color="black">
        Past Reports
      </Text>

      <VStack bg="white" align="center">
        {sortedReports.filter((report) => !report.isActive).length === 0 ? (
          <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
            <Text fontWeight={"400"} fontSize={"120%"}>
              No reports found
            </Text>
          </Box>
        ) : (
          sortedReports
            .filter((report) => !report.isActive)
            .map((report) => <ReportItem key={report.id} report={report} />)
        )}
      </VStack>
    </div>
  );
}

export default UserMyReport;
