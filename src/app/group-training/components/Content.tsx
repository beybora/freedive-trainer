"use client";

import {
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  useGetAllGroupTraining,
} from "@/app/api/hooks/groupTraining/useGetAllGroupTraining";
import { useAppContext } from "@/context";
import ParticipantList from "./ParticipantList";
import { AddIcon, ArrowBackIcon, MinusIcon } from "@chakra-ui/icons";
import { useAddUserToGroup } from "@/app/api/hooks/groupTraining/useAddUserToGroup";
import { useSession } from "next-auth/react";
import { useLeaveUserFromGroup } from "@/app/api/hooks/groupTraining/useLeaveUserFromGroup";

const Content = () => {
  const { groupTraining: selectedGroupTrainingIndex, setGroupTraining } =
    useAppContext();
  const { data, isLoading } = useGetAllGroupTraining();
  const addUserToGroupMutation = useAddUserToGroup();
  const leaveUserFromGroupMutation = useLeaveUserFromGroup();
  const { data: session } = useSession();
  const groupTrainingData = data?.[selectedGroupTrainingIndex];
  const participantIds = groupTrainingData?.participants;

  const handleAdd = () => {
    addUserToGroupMutation.mutate(groupTrainingData?._id);
  };

  const handleLeave = () => {
    leaveUserFromGroupMutation.mutate(groupTrainingData?._id);
  };

  const handleBack = () => {
    setGroupTraining(null);
  };

  let isFull = false;
  if (groupTrainingData) {
    isFull =
      groupTrainingData?.participants?.length >=
      groupTrainingData?.participantLimit;
  }

  const userId = session?.user?.id ?? "";
  const isUserInParticipants = participantIds?.includes(userId);

  return (
    <Box
      display={"flex"}
      alignItems="start"
      flexDirection="column"
      padding={3}
      bg="white"
      width={{ base: "100%", md: "70%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <>
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display={"flex"} gap={"5"}>
            <IconButton
              aria-label="Back"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={handleBack}
            />
            {!isUserInParticipants && groupTrainingData && !isFull && (
              <IconButton
                aria-label="Add Group"
                display={"flex"}
                icon={<AddIcon />}
                onClick={handleAdd}
              />
            )}
            {isUserInParticipants && (
              <IconButton
                aria-label="Leave Group"
                display={"flex"}
                icon={<MinusIcon />}
                onClick={handleLeave}
              />
            )}
          </Box>
        </Box>
        {groupTrainingData && (
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="100%"
            background="#f7f7f7"
            padding={3}
          >
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              width={"100%"}
              height={"100%"}
              overflow="none"
            >
              <GridItem bg="light-grey" padding="3">
                <Box>
                  <Heading size="md">Informations</Heading>
                  <Heading size="sm">{groupTrainingData?.location}</Heading>
                  <Text> {groupTrainingData?.date?.toString()}</Text>
                </Box>
              </GridItem>
              <GridItem bg="light-grey" padding="3">
                <Box>
                  <Heading size="md">Map</Heading>
                  <Text>{selectedGroupTrainingIndex?.location}</Text>
                </Box>
              </GridItem>
              <GridItem colSpan={2} bg="light-grey" padding="3">
                <Box>
                  {groupTrainingData && (
                    <ParticipantList participantIds={participantIds} />
                  )}
                </Box>
              </GridItem>
            </Grid>
          </Box>
        )}
      </>
    </Box>
  );
};

export default Content;
