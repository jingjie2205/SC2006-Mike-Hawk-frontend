import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Input,
  Box,
} from "@chakra-ui/react";
import ReportItem from "../UserMyReport/ReportItem";

function UserMyReport() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [postContent, setPostContent] = useState("");

  const openReportDetails = (report) => setSelectedReport(report);
  const closeReportDetails = () => setSelectedReport(null);

  const handlePost = () => {
    console.log("User post:", postContent); // Handle post submission logic here
    setPostContent(""); // Clear input after posting
  };

  return (
    <div>
      {/* Render reports */}
      <VStack>
        {sortedReports.map((report) => (
          <ReportItem
            key={report.id}
            report={report}
            onClick={() => openReportDetails(report)}
          />
        ))}
      </VStack>

      {/* Report Details Modal */}
      {selectedReport && (
        <Modal isOpen={!!selectedReport} onClose={closeReportDetails}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedReport.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="left">
                <Text><strong>Description:</strong> {selectedReport.description}</Text>
                <Text><strong>Date:</strong> {selectedReport.date}</Text>
                <Text><strong>Severity:</strong> {selectedReport.severity}</Text>
                <Box>
                  <Input
                    placeholder="Write your post here"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    mb={3}
                  />
                  <Button onClick={handlePost} colorScheme="blue">
                    Post
                  </Button>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default UserMyReport;
