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
  Wrap,
  WrapItem,
  Container,
  Spinner,
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

import SpaceCard from "./SpaceCard";
import useSpaces from "../../hooks/useSpaces";
import { useState } from "react";

export type SpaceType = {
  [key: string]: any; // 👈️ allows dynamic keys and values
  id: string;
  name: string;
  currentVideoId: string | null;
  currentVideoName: string | null;
  users: string[];
  userCount: number;
  syncUser: string;
};

type pageProps = {
  index: number;
  isActiveOnly: boolean;
};

const Page = ({ index, isActiveOnly }: pageProps) => {
  const [pageIndex, setPageIndex] = useState(index);
  const { spaces, isLoading, isError } = useSpaces(pageIndex, isActiveOnly);

  if (isLoading || isError) return <Spinner />;

  return (
    <Stack spacing={2}>
      {spaces &&
        spaces.map((space: SpaceType, index: number) => (
          <SpaceCard space={space} key={index} />
        ))}
    </Stack>
  );
};

export default Page;
