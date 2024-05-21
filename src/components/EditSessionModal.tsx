import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const EditSessonModal = ({ onClose, isOpen }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Dive</ModalHeader>
            <ModalBody>
              <p>Form goes here</p>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditSessonModal;
