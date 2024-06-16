import {
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
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { GroupTraining } from "@/constants/optionsAndTypes";
import { useAddGroupTraining } from "@/app/api/hooks/useAddGroupTraining";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};



const onSubmit = (data: GroupTraining) => {
  console.log("data: ", data);
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
  const addGroupTraining = useAddGroupTraining()

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

  const onSubmit: SubmitHandler<GroupTraining> = async (data: GroupTraining) => {
    console.log("data: ", data);
    addGroupTraining.mutate(data)
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent padding="2rem">
            <ModalHeader>Group Training</ModalHeader>
            <ModalBody>
              {currentStep === 0 && (
                <>
                  <FormControl isInvalid={!!errors.location}>
                    <FormLabel>Where do you want to dive?</FormLabel>
                    <Input
                      type="text"
                      id="place"
                      placeholder="location"
                      {...register("location", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.location && errors.location.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.dateTime}>
                    <FormLabel>Which day and which time?</FormLabel>
                    <Input
                      type="datetime-local"
                      id="datetime"
                      placeholder="Select Date and Time"
                      {...register("dateTime", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.dateTime && errors.dateTime.message}
                    </FormErrorMessage>
                  </FormControl>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <FormControl isInvalid={!!errors.number}>
                    <FormLabel>How many dives do you want to do?</FormLabel>
                    <Input
                      type="number"
                      id="number"
                      placeholder="Number"
                      {...register("number", {
                        required: "This field is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.number && errors.number.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* <FormControl>
                    <FormLabel>How was your mood?</FormLabel>
                    <Controller
                      control={control}
                     id="disciplines"
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
                  </FormControl> */}
                  <FormControl isInvalid={!!errors.number}>
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
                      {errors.number && errors.number.message}
                    </FormErrorMessage>
                  </FormControl>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FormControl>
                    <FormLabel>Do you have your own Buoy?</FormLabel>
                    <Checkbox colorScheme="green" {...register("hasBuoy")} />
                  </FormControl>
                </>
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
