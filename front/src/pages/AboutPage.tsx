import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

import useSpaces from "../hooks/useSpaces";
import SpaceCard from "./SpaceListPage/SpaceCard";
import { Link as ReachLink } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <Heading>Under Development - Planned Feature</Heading>

      <br></br>
      <Text>1. Add Taking Note</Text>
      <br></br>
      <Text>2. Add Playlist</Text>
    </>
  );
}
