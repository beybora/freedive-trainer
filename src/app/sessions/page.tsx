"use client";

import AddNewEntryButton from "@/components/AddNewSessionButton";
import DiveCard from "@/components/DiveCard";
import { Box, VStack, Spinner, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useDives, useGetDive } from "../api/hooks";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context";
import EditSessonModal from "@/components/EditSessionModal";

export default function Dives() {
  const { data, isError, isLoading } = useDives();
  const { diveId, setDiveId } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDiveId = (id: string) => {
    setDiveId(id);
    console.log("page.tsx - handleDiveId() : id", id);
  };

  if (isLoading)
    return (
      <VStack w="full" spacing={12} h="80vh" justify="center">
        <Spinner size={"lg"} />
      </VStack>
    );

  return (
    <main>
      <Box>
        <AddNewEntryButton />
        <EditSessonModal onClose={onClose} isOpen={isOpen} /> 
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {data?.map((dive) => (
            <GridItem>
              <DiveCard key={dive._id} dive={dive} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </main>
  );
}
