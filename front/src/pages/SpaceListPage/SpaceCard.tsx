import {
  Box,
  Image,
  Badge,
  Flex,
  Spacer,
  Text,
  IconButton,
  Button,
  Stack,
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

import { SpaceType } from "./Page";
import { Link as ReachLink } from "react-router-dom";

import videoLogo from "../../images/Videologo.png";

type SpaceProps = {
  space: SpaceType;
};

const SpaceCard = ({ space }: SpaceProps) => {
  const {
    id,
    name,
    currentVideoId,
    currentVideoName,
    users,
    syncUser,
    userCount,
    userList,
  } = space;

  const videoImage = currentVideoId
    ? `https://img.youtube.com/vi/${currentVideoId}/mqdefault.jpg`
    : videoLogo;

  const spaceLink = `/space/${id}`;

  return (
    // <Box maxW="xs" borderWidth="2px" borderRadius="lg" overflow="hidden">
    <Link as={ReachLink} to={spaceLink}>
      <Box borderWidth="2px">
        <Stack direction={{ base: "column", md: "row" }}>
          <Image src={videoImage} alt={currentVideoName || ""} />

          <Box p="4">
            <Stack spacing={1} align={"baseline"}>
              <Box>
                <Box fontWeight="semibold" as="h4" noOfLines={1}>
                  {name}
                </Box>
              </Box>

              <Box fontSize="xs" noOfLines={1}>
                {currentVideoName}
              </Box>

              <Box fontSize="xs" noOfLines={1}>
                {userList.length} watching
              </Box>
            </Stack>

            <Box></Box>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
};

export default SpaceCard;
