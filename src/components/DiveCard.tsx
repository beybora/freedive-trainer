import { Session } from "@/constants/optionsAndTypes";
import { EditIcon } from "@chakra-ui/icons";
import { useDeleteDive } from "@/app/api/hooks/useDeleteDive";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  Divider,
  HStack,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditSessonModal from "./EditSessionModal";

type Props = {
  dive: Session;
};

const DiveCard = ({ dive }: Props) => {
  const formattedDate = new Date(dive.createdAt).toDateString();
  const deleteDiveMutation = useDeleteDive();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: string) => {
    deleteDiveMutation.mutate(id); // Call the hook with the dive id
  };


  return (
    <>
      <EditSessonModal onClose={onClose} isOpen={isOpen} />
      <Card position={"relative"} variant={"elevated"}>
        <HStack gap="5">
          <CloseButton
            onClick={() => handleDelete(dive._id)}
            position="absolute"
            size="md"
            top="0"
            right="0"
          />
        </HStack>

        <CardHeader display={"flex"} gap="2">
          <Heading size="md">{formattedDate}</Heading>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="teal"
            aria-label="Edit Dive"
            fontSize="10px"
            size="sm"
            icon={<EditIcon />}
            onClick={onOpen}
          />
        </CardHeader>
        <CardBody>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton paddingLeft={"0"}>
                  <Box as="span" flex="1" textAlign="left">
                    Number of dives: {dive.dives.length}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} paddingLeft={"0"}>
                {dive.dives.map((dive, index: number) => {
                  return (
                    <Box key={index} paddingBottom={2}>
                      <Text>Discipline: {dive.discipline.label}</Text>
                      <Text>Time: {dive.time}min</Text>
                      <Text>Depth: {dive.depth}m</Text>
                      <Text>Mood: {dive.mood.label}</Text>
                    </Box>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </>
  );
};

export default DiveCard;
