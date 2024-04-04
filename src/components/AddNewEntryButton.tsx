"use client";

import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddNewEntryModal from "./AddNewEntryModal";

const AddNewEntryButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add dive!</Button>
      <AddNewEntryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewEntryButton;
