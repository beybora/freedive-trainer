"use client";

import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddNewSessionModal from "./AddNewSessionModal";

const AddNewEntryButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add dive!</Button>
      <AddNewSessionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewEntryButton;
