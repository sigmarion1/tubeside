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

export default function CallToActionWithAnnotation() {
  const { spaces, isLoading, isError } = useSpaces(1, false);

  const randomSpaceNumber = Math.floor(Math.random() * 3);

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Watch video together!
            <br />
            <Text as={"span"} color={"red.400"}>
              TubeSide
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            TubeSide is website for share youtube videos with other people. The
            manager can sync video with other people. So every people in the
            same space can view the same screen at the same time. Also, we
            provied the private space with invited people. Just create private
            space and share the link. No login required.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"red"}
              bg={"red.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "red.500",
              }}
              as={ReachLink}
              to={"/create-space"}
            >
              Create Space
            </Button>

            <Text p={5}> OR</Text>
            <div>
              {spaces && <SpaceCard space={spaces[randomSpaceNumber]} />}
            </div>

            <Button
              as={ReachLink}
              to={"/space"}
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
            >
              Explore more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
