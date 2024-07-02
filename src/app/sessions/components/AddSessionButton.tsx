"use client";

import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddSessionModal from "./AddSessionModal";

const AddSessionButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add a session!</Button>
      <AddSessionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddSessionButton;
