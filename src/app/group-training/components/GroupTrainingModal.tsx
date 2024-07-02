import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { GroupTraining } from "@/types/optionsAndTypes";
import { useAddGroupTraining } from "@/app/api/hooks/groupTraining/useAddGroupTraining";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const steps = [
  {
    label: "Step 1",
    content: "Step 1 content",
  },
  {
    label: "Step 2",
    content: "Step 2 content",
  },
  {
    label: "Step 3",
    content: "Step 3 content",
  },
];

const GroupTrainingModal = ({ isOpen, onClose }: Props) => {
  const form = useForm<GroupTraining>();
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [currentStep, setCurrentStep] = useState(0);
  const addGroupTraining = useAddGroupTraining();

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      reset();
    }
  }, [isOpen]);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<GroupTraining> = async (
    data: GroupTraining
  ) => {
    addGroupTraining.mutate(data);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent padding="2rem">
            <ModalBody>
              {currentStep === 0 && (
                <VStack gap="5">
                  <Heading size="md">Date and Location</Heading>
                  <FormControl isInvalid={!!errors.location}>
                    <FormLabel>Where do you want to dive?</FormLabel>
                    <Input
                      type="text"
                      id="place"
                      placeholder="Location"
                      {...register("location", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.location && errors.location.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.date}>
                    <FormLabel>Which day</FormLabel>
                    <Input
                      type="date"
                      id="date"
                      placeholder="Select Date"
                      {...register("date", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.date && errors.date.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              )}
              {currentStep === 1 && (
                <VStack gap="5">
                  <Heading size="md">Own diving plans</Heading>
                  <FormControl isInvalid={!!errors.diveNumber}>
                    <FormLabel>How many dives do you want to do?</FormLabel>
                    <Input
                      type="number"
                      id="diveNumber"
                      placeholder="How many Dives?"
                      {...register("diveNumber", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.diveNumber && errors.diveNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.depth}>
                    <FormLabel>What is your targeted depth?</FormLabel>
                    <Input
                      type="number"
                      id="depth"
                      placeholder="Targeted Depth in meters"
                      {...register("depth", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.depth && errors.depth.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              )}
              {currentStep === 2 && (
                <VStack gap="5">
                  <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Give the Session a name!</FormLabel>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Title"
                      {...register("title")}
                    />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.participantLimit}>
                    <FormLabel>What is your buddy limit?</FormLabel>
                    <Input
                      type="text"
                      id="participantLimit"
                      placeholder="Whats the Buddy Limit?"
                      {...register("participantLimit")}
                    />
                    <FormErrorMessage>
                      {errors.participantLimit &&
                        errors.participantLimit.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Do you have your own Buoy?</FormLabel>
                    <Checkbox colorScheme="green" {...register("hasBuoy")} />
                  </FormControl>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              {currentStep > 0 && (
                <Button
                  mr={3}
                  onClick={prev}
                  colorScheme="blackAlpha"
                  leftIcon={<ArrowLeftIcon />}
                />
              )}

              {currentStep === steps.length - 1 ? (
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="blackAlpha"
                  onClick={next}
                  leftIcon={<ArrowRightIcon />}
                />
              )}
            </ModalFooter>
          </ModalContent>
        </form>
        <DevTool control={control} />
      </Modal>
    </>
  );
};

export default GroupTrainingModal;
