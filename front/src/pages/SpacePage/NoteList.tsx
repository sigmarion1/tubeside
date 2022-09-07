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
import NoteItem from "./NoteItem";

const NoteList = () => {
  const property = [
    {
      time: "00:34",
      content: "아 정말 재미있다!!",
    },
    {
      time: "00:34",
      content: "아 정말 재미있다!!",
    },
    {
      time: "00:34",
      content: "아 정말 재미있다!!",
    },
    {
      time: "00:34",
      content: "아 정말 재미있다!!",
    },
  ];

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          {property.map((note, index) => (
            <NoteItem content={note.content} time={note.time} key={index} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default NoteList;
