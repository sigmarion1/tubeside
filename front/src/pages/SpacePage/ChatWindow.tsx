import { useEffect, useRef, useState } from "react";

import {
  Container,
  Heading,
  Box,
  Image,
  Badge,
  Flex,
  Spacer,
  Text,
  IconButton,
  Button,
  Stack,
  Grid,
  GridItem,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  space,
  Avatar,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  ChatIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

import YouTube from "react-youtube";
import { Socket } from "socket.io-client";

import ChatMessage from "./ChatMessage";
import NoteList from "./NoteList";

type ChatWindowProps = {
  socket: Socket;
  currentUserName: string;
  spaceId: string | undefined;
};

type ChatListType = {
  userName: string;
  body: string;
  time: string;
};

const ChatWindow = ({ socket, currentUserName, spaceId }: ChatWindowProps) => {
  const [inputChat, setInputChat] = useState("");
  const [chatList, setChatList] = useState<ChatListType[]>([]);

  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputChat.trim()) {
      setInputChat("");
      socket.emit("chat:send", spaceId, currentUserName, inputChat);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.currentTarget.value);
  };

  const scrollToBottom = () => {
    // window.scrollTo({ top: 90000 });
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      // inline: "start",
    });
  };

  useEffect(() => {
    socket.on("client:chat:receive", ({ userName, body, time }) => {
      setChatList([...chatList, { userName, body, time }].slice(0, 200));
    });
    scrollToBottom();
  }, [chatList]);

  return (
    <Stack direction={"column"} height={"100%"}>
      {/* <Box
        flex={3}
        sx={{ overflowY: "scroll" }}
        maxH={{ base: "100px", md: "100%" }}
      >
        <NoteList />
      </Box>
      <Divider pb={1} /> */}
      <Box
        flex={7}
        sx={{ overflowY: "scroll" }}
        maxH={{ base: "200px", md: "100%" }}
      >
        {chatList.map(({ userName, body, time }, index) => (
          <ChatMessage
            userName={userName}
            body={body}
            time={time}
            key={index}
          />
        ))}
        <div ref={chatEndRef} />
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack direction={"row"}>
          <Input
            size={"xl"}
            rounded={"xl"}
            p={2}
            value={inputChat}
            onChange={onChangeInput}
            maxLength={200}
            placeholder={"Send a message"}
            // bg={useColorModeValue("red.100", "red.200")}
          />{" "}
          <Button type="submit">Send</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatWindow;
