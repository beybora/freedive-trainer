import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  place: string;
  date: Date;
  number: number;
};

const onSubmit = (data: FormValues) => {
  console.log("data: ", data);
};

const GroupTrainingModal = ({ isOpen, onClose }: Props) => {
  const { register, control, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent padding="2rem">
            <ModalHeader>Create a new Group Training</ModalHeader>
            <ModalBody>
              <FormControl isInvalid={!!errors.place}>
                <FormLabel>Place</FormLabel>
                <Input
                  type="text"
                  id="place"
                  placeholder="Place"
                  {...register("place", { required: "This field is required" })}
                />
                <FormErrorMessage>
                  {errors.place && errors.place.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.date}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  id="date"
                  placeholder="Date"
                  {...register("date", { required: "This field is required" })}
                />
                <FormErrorMessage>
                  {errors.date && errors.date.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.number}>
                <FormLabel>Number of dives</FormLabel>
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
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
        <DevTool control={control} />
      </Modal>
    </>
  );
};

export default GroupTrainingModal;
