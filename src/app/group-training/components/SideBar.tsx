import GroupTrainingButton from "@/components/GroupTrainingButton";
import { Box } from "@chakra-ui/react";
import React from "react";

const SideBar = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      padding={3}
      borderRadius="lg"
      bg="white"
      width={{ base: "100%", md: "30%" }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <GroupTrainingButton />
      </Box>
      <Box
        display="flex"
        flexDir="column"
        width="100%"
        height="100%"
        padding={3}
        bg="#f7f7f7"
        overflow="hidden"
      >
      </Box>
    </Box>
  );
};

export default SideBar;
