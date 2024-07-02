import React from "react";

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
  useBoolean,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { useAddDive } from "@/app/api/hooks/sessions/useAddDive";
import {
  DisciplineOptions,
  MoodOptions,
  Dive,
} from "@/types/optionsAndTypes";

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

const AddSessionModal = ({ isOpen, onClose }: Props) => {
  const addDiveMutation = useAddDive();

  const {
    register,
    control: formControl,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      dives: [defaultDive],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: formControl,
    name: "dives",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    addDiveMutation.mutate(data);
    onClose();
    reset({ dives: [defaultDive] });
  };

  const resetDiveArray = () => {
    onClose();
    reset({ dives: [defaultDive] });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => resetDiveArray()}
        scrollBehavior="outside"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Session</ModalHeader>
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
                              placeholder="Select moods!"
                            />
                          )}
                        />
                        <FormErrorMessage>
                          {errors.dives?.[index]?.mood &&
                            errors.dives?.[index]?.mood?.message}
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
              <Button variant="ghost" mr={3} onClick={() => resetDiveArray()}>
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

export default AddSessionModal;
