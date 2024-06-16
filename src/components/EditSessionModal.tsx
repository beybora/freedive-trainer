import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import {
  DisciplineOptions,
  MoodOptions,
  Dive,
} from "@/constants/optionsAndTypes";
import { useDives } from "@/app/api/hooks";
import { useAppContext } from "@/context";
import { useEditSession } from "@/app/api/hooks/useEditSession";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  dives: Dive[];
};

const defaultDive = {
  discipline: DisciplineOptions[0],
  time: "",
  depth: "",
  mood: MoodOptions[1],
};

const EditSessionModal = ({ isOpen, onClose }: Props) => {
  const editSessionMutation = useEditSession();
  const { data: sessions, isError, isLoading } = useDives();
  const { diveId, setDiveId } = useAppContext();
  const form = useForm<Inputs>({
    defaultValues: { dives: [] },
  });

  const {
    register,
    control: formControl,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: formControl,
    name: "dives",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    editSessionMutation.mutate({ id: diveId, requestBody: data });
    onClose();
  };

  useEffect(() => {
    if (sessions) {
      const sessionData = sessions.find((session) => session._id === diveId);
      if (sessionData) {
        const formattedDives = sessionData.dives.map((dive) => ({
          ...dive,
          discipline: DisciplineOptions.find(
            (option) => option.value === dive.discipline.toString()
          ),
          mood: MoodOptions.find(
            (option) => option.value === dive.mood.toString()
          ),
        }));
        reset({ dives: formattedDives });
      }
    }
  }, [sessions, reset, diveId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Session</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={6} divider={<Divider />}>
                <Button
                  alignSelf={"flex-end"}
                  colorScheme="blue"
                  onClick={() => append(defaultDive)}
                >
                  Add a new dive!
                </Button>
                {fields.map((field, index) => {
                  return (
                    <VStack alignItems={"flex-start"} w={"full"} key={field.id}>
                      <Heading size={"sm"}>Dive #{index + 1} </Heading>
                      <FormControl>
                        <FormLabel>Discipline</FormLabel>
                        <Controller
                          control={control}
                          name={`dives.${index}.discipline`}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={DisciplineOptions}
                              placeholder="Select discipline!"
                            />
                          )}
                        />
                        <FormErrorMessage>
                          {errors.dives?.[index]?.discipline &&
                            errors.dives?.[index]?.discipline?.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.dives?.[index]?.depth}>
                        <FormLabel>Depth</FormLabel>
                        <Input
                          type="number"
                          placeholder="Depth in meters"
                          {...register(`dives.${index}.depth`, {
                            required: "This field is required",
                            min: {
                              value: 0,
                              message: "Depth must be a positive number!",
                            },
                          })}
                        />
                        <FormErrorMessage>
                          {errors.dives?.[index]?.depth &&
                            errors.dives?.[index]?.depth?.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.dives?.[index]?.time}>
                        <FormLabel>Time</FormLabel>
                        <Input
                          type="number"
                          placeholder="Dive time in minutes"
                          {...register(`dives.${index}.time`, {
                            required: "This field is required",
                            min: {
                              value: 0,
                              message: "Dive time must be a positive number!",
                            },
                          })}
                        />
                        <FormErrorMessage>
                          {errors.dives?.[index]?.time &&
                            errors.dives?.[index]?.time?.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel>How was your mood?</FormLabel>
                        <Controller
                          control={control}
                          name={`dives.${index}.mood`}
                          defaultValue={field.mood}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={MoodOptions}
                              placeholder="Select moods!"
                            />
                          )}
                        />
                        <FormErrorMessage>
                          {errors.dives?.[index]?.mood &&
                            errors.dives?.[index]?.mood?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </VStack>
                  );
                })}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Save dive
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditSessionModal;
