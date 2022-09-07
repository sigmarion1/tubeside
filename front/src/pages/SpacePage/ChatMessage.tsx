import { useEffect, useRef, useState } from "react";

import {
  Avatar,
  chakra,
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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  ChatIcon,
} from "@chakra-ui/icons";

type ChatWindowProps = {
  userName: string;
  body: string;
  time: string;
};

const ChatWindow = ({ userName, body, time }: ChatWindowProps) => {
  const isSystem = userName === "System";

  const bg = isSystem ? "red.400" : "gray.500";
  const avatarUrl = isSystem
    ? `https://avatars.dicebear.com/api/bottts/1.svg`
    : `https://avatars.dicebear.com/api/adventurer-neutral/${userName}.svg`;

  const localTimeString = new Date(time).toLocaleTimeString();

  return (
    <Stack
      // bg={bg}
      // boxShadow={"lg"}
      // marginBottom={1}
      // m={1}
      rounded={"xl"}
      p={1}
      m={1}
      marginBottom={1}
      direction={"row"}
      // align={"center"}
      // pos={"relative"}
    >
      <Avatar size={"sm"} src={avatarUrl} />
      <Stack direction={"column"} fontSize={"sm"}>
        {/* <Heading
          as={"h3"}
          fontFamily={"Sunflower"}
        >
          {messageInfo.username}
        </Heading> */}

        <Text fontWeight={"bold"}>
          {userName}
          <chakra.a fontWeight={"light"}> - {localTimeString}</chakra.a>
          {/* <Button size={"xs"} variant="outline">
            Keep
          </Button> */}
        </Text>
        <Text>{body}</Text>
      </Stack>
    </Stack>
  );
};

export default ChatWindow;
