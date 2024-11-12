import React, { useState, useMemo, useEffect } from "react";
import config from "../../config";
import axios from "axios";
import NavBar from "../../Common/NavBar";
import { Box, Text, Input, VStack, IconButton, HStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SortBy from "../UserMyReport/SortBy";
import ReportItem from "../UserMyReport/ReportItem";
import { useNavigate } from "react-router-dom";

function AuthorityMyReport() {
    const userId = localStorage.getItem("userId");

    const [searchQuery, setSearchQuery] = useState("");
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login"); // Redirects to login if userId is missing
            return;
        }

        const fetchUserReports = async () => {
            try {
                const response = await axios.get(
                    `${config.baseURL}/reports/reports/get_reports_by_authority_id/${userId}`
                );
                if (response.status === 200) {
                    console.log(response.data);
                    setReports(response.data);
                    setFilteredReports(response.data);
                }
            } catch (err) {
                console.error("Error fetching user reports:", err);
                setError("Failed to fetch reports. Please try again later.");
            }
        };

        fetchUserReports();
    }, [userId]);

    const handleSearch = () => {
        setFilteredReports(
            searchQuery.trim()
                ? reports.filter((report) =>
                      report.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
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
            return sortReports.sort((a, b) => b.datetime - a.datetime);
          }
          if (sortOption === "Oldest") {
            return sortReports.sort((a, b) => a.datetime - b.datetime);
          }
        return sortReports;
    }, [filteredReports, sortOption]);

    const openReportDetails = (report) => {
        navigate(`/report/${report.ReportID}`, { state: { report } });
    };

    return (
        <div>
            {error && (
                <Box bg="red.100" p="4" mb="4" borderRadius="md">
                    <Text color="red.700">{error}</Text>
                </Box>
            )}

            <VStack bg="#06ADBF" align="center" mt="3%">
                <Text
                    fontWeight="1000"
                    mt="3%"
                    mb="3%"
                    fontSize="200%"
                    color="white"
                >
                    My Reports
                </Text>
            </VStack>

            <HStack
                alignItems="center"
                mt="3%"
                position={"sticky"}
                m="3%"
                p="10px"
            >
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
                <SortBy
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                />
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

            <Text
                fontWeight="500"
                mb="2%"
                fontSize="250%"
                align="center"
                color="black"
            >
                Pending Reports
            </Text>

            <VStack bg="white" align="center">
                {sortedReports.filter(
                    (report) =>
                        report.status === "Pending"
                ).length === 0 ? (
                    <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
                        <Text fontWeight={"400"} fontSize={"120%"}>
                            No reports found
                        </Text>
                    </Box>
                ) : (
                    sortedReports
                        .filter(
                            (report) =>
                                report.status === "Pending"
                        )
                        .map((report) => (
                            <ReportItem
                                key={report.report_id}
                                report={report}
                                onClick={() => openReportDetails(report)}
                            />
                        ))
                )}
            </VStack>

            <Text
                fontWeight="500"
                mb="2%"
                fontSize="250%"
                align="center"
                color="black"
            >
                In Progress Reports
            </Text>

            <VStack bg="white" align="center">
                {sortedReports.filter(
                    (report) =>
                        report.status === "In Progress"
                ).length === 0 ? (
                    <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
                        <Text fontWeight={"400"} fontSize={"120%"}>
                            No reports found
                        </Text>
                    </Box>
                ) : (
                    sortedReports
                        .filter(
                            (report) =>
                                report.status === "In Progress"
                        )
                        .map((report) => (
                            <ReportItem
                                key={report.report_id}
                                report={report}
                                onClick={() => openReportDetails(report)}
                            />
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
                Resolved Reports
            </Text>

            <VStack bg="white" align="center">
                {sortedReports.filter((report) => report.status === "Resolved")
                    .length === 0 ? (
                    <Box bg="#dddddd" w="80%" margin="3% 0" padding="3%">
                        <Text fontWeight={"400"} fontSize={"120%"}>
                            No reports found
                        </Text>
                    </Box>
                ) : (
                    sortedReports
                        .filter((report) => report.status === "Resolved")
                        .map((report) => (
                            <ReportItem
                                key={report.report_id}
                                report={report}
                                onClick={() => openReportDetails(report)}
                            />
                        ))
                )}
            </VStack>
            <Box position="fixed" bottom="0" width="100%" overflow="hidden">
                <NavBar />
            </Box>
        </div>
    );
}

export default AuthorityMyReport;
