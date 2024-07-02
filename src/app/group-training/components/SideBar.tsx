"use client";

import GroupTrainingButton from "@/app/group-training/components/GroupTrainingButton";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import {
  useGetAllGroupTraining,
} from "@/app/api/hooks/groupTraining/useGetAllGroupTraining";
import { useAppContext } from "@/context";


const SideBar = () => {
  const { data, isLoading } = useGetAllGroupTraining();
  const { groupTraining } = useAppContext();

  return (
    <Box
      display={{ base: groupTraining ? "none" : "flex", md: "flex" }}
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
        flexDir="column"
        width="100%"
        height="100%"
        padding={3}
        bg="#f7f7f7"
        overflow="scroll"
      >
        <VStack spacing={6} overflow="hidden">
          {data?.map((training, index) => (
            <Card groupTraining={training} index={index} key={index} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default SideBar;
