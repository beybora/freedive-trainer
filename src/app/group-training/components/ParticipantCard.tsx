import { useGetUserById } from "@/app/api/hooks/user/useGetUserById";
import { Box, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

type Props = {
  participantId: string;
};

const ParticipantCard = ({ participantId }: Props) => {
  const { data, isLoading } = useGetUserById(participantId);
  
  return (
    <Card width={"25%"} padding={3}>
      <CardHeader>
        <Heading size="md">{data?.name?.toUpperCase()}</Heading>
        </CardHeader>
      <CardBody>{data?.email }</CardBody>
    </Card>
  );
};

export default ParticipantCard;
