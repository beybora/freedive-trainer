"use client";

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
import { useSession } from "next-auth/react";

const Dives = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

//   if (isLoading)
//     return (
//       <VStack w="full" spacing={12} h="80vh" justify="center">
//         <Spinner size={"lg"} />
//       </VStack>
//     );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      h="91.5vh"
      padding="15px"
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        padding={3}
        borderRadius="lg"
        bg="white"
        width="100%"
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
          <Button>Create a Dive Session</Button>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          padding={3}
          bg="#F8F8F8"
          width="100%"
          height="100%"
          overflowY="hidden"
        >
          {/* <Grid templateColumns="repeat(3, 1fr)" gap={6} overflowY="scroll">
            {data?.map((dive) => (
              <GridItem key={dive._id}>
                <DiveCard dive={dive} />
              </GridItem>
            ))}
          </Grid> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dives;
