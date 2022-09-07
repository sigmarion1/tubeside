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

import ChatMessage from "./ChatMessage";
import { time } from "console";

type NoteType = {
  time: string;
  content: string;
};

const NoteItem = (Note: NoteType) => {
  return (
    <Tr>
      <Td>
        <Link textColor={"blue.500"} textDecorationLine={"underline"}>
          {Note.time}
        </Link>
      </Td>
      <Td>
        {Note.content}
        <Icon pl={1} as={DeleteIcon} />
      </Td>
    </Tr>
  );
};

export default NoteItem;
