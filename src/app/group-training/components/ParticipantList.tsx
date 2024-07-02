import ParticipantCard from "./ParticipantCard";
import { Box, HStack, Heading } from "@chakra-ui/react";

type Props = {
  participantIds: { [key: number]: String }[] | undefined;
};

const ParticipantList = ({ participantIds }: Props) => {
  console.log("participantIds", participantIds);
  return (
    <Box>
      <Heading size="md" marginBottom={3}>
        Participants List
      </Heading>
      <HStack>
        {participantIds?.map((id) => (
          console.log("id", id),  
          <ParticipantCard key={id.toString()} participantId={id.toString()} />
        ))}
      </HStack>
    </Box>
  );
};

export default ParticipantList;
