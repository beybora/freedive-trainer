import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GroupTraining } from "@/types/optionsAndTypes";
import { useAppContext } from "@/context";

type Props = {
  groupTraining: GroupTraining;
  index: Number;
};

const TrainingCard = ({ groupTraining, index }: Props) => {
  const { setGroupTraining } = useAppContext();
  const isFull =
    groupTraining?.participants.length >= groupTraining?.participantLimit;

  const participantCountColor = useColorModeValue("orange", "teal"); // Adjust colors for light/dark mode

  const handleClick = () => {
    return () => {
      setGroupTraining(index);
    };
  };

  return (
    <Card
      position={"relative"}
      variant={"filled"}
      width="100%"
      height="100%"
      onClick={handleClick()}
      _hover={{ bg: "grey" }}
      bg={isFull ? "#F68B38" : "#ADD288"}
    >
      <CardHeader>
        <Heading size="md">{groupTraining?.date?.toString()}</Heading>
        <Heading size="sm">{groupTraining?.location} </Heading>
        <Text>{`${groupTraining.participants.length}/${groupTraining.participantLimit}`}</Text>
      </CardHeader>
      <CardBody>
        <Text>{groupTraining?.title}</Text>
      </CardBody>
    </Card>
  );
};

export default TrainingCard;
