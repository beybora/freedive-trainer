"use client";

import { Box } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import useRealTimeUpdates from "../api/hooks/useRealTimeUpdates";

const Dives = () => {
  useRealTimeUpdates();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      h="91.5vh"
      padding="15px"
      gap={6}
    >
      <SideBar />
      <Content />
    </Box>
  );
};

export default Dives;
