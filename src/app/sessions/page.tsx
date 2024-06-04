"use client";

import AddNewEntryButton from "@/components/AddNewSessionButton";
import DiveCard from "@/components/DiveCard";
import {
  Box,
  VStack,
  Spinner,
  Grid,
  GridItem,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useDives } from "../api/hooks";
import EditSessonModal from "@/components/EditSessionModal";
import { signOut, useSession } from "next-auth/react";

export default function Dives() {
  const { data, isError, isLoading } = useDives();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  if (isLoading)
    return (
      <VStack w="full" spacing={12} h="80vh" justify="center">
        <Spinner size={"lg"} />
      </VStack>
    );

  return (
    <main>
      <Box>
        <Box>
          {session && `Welcome ` + session.user?.name}{" "}
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Box>
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
