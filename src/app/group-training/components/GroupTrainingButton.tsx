import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import GroupTrainingModal from './GroupTrainingModal'

const GroupTrainingButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Add new Group Training </Button>
      <GroupTrainingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default GroupTrainingButton
