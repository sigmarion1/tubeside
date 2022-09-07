import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import { Link as ReachLink } from "react-router-dom";

interface joinProps {
  handleUserNameSubmit: (e: React.FormEvent, userName: string) => void;
  currentUserName: string;
}

const EnterModal = ({ handleUserNameSubmit, currentUserName }: joinProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState("");

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const isNotJoined = currentUserName.length === 0;

  return (
    <Modal isCentered isOpen={isNotJoined} onClose={onClose}>
      <ModalOverlay backdropBlur={"100"} />
      <ModalContent p={5}>
        <ModalCloseButton as={ReachLink} to={"/space"} />{" "}
        <ModalHeader>Please enter your name</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => handleUserNameSubmit(e, userName)}>
            <Stack direction={"row"}>
              <Input
                required
                maxLength={20}
                value={userName}
                onChange={onChangeUserName}
              ></Input>
              <Button type="submit">Join</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EnterModal;
