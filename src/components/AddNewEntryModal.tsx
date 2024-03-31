"use client";

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
} from "@chakra-ui/react";
type Props = { isOpen: boolean; onClose: () => void };

const AddNewEntryModal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a dive</ModalHeader>
          <ModalCloseButton />
          <ModalBody>How was your dive Today?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Save dive</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewEntryModal;
