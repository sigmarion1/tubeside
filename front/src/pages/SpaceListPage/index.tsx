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
  Alert,
  AlertTitle,
  Checkbox,
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
import Page from "./Page";

const SpaceListPage = () => {
  const [cnt, setCnt] = useState(1);
  const [isActiveOnly, setIsActiveOnly] = useState(true);
  const { totalPages } = useSpaces(1, isActiveOnly);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page index={i + 1} isActiveOnly={isActiveOnly} key={i} />);
  }

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setCnt(1);
    setIsActiveOnly(c.target.checked);
  };

  const isLastPage = totalPages ? cnt >= totalPages : true;

  return (
    <Container maxW={"5xl"} pt={2}>
      <Checkbox p={2} isChecked={isActiveOnly} onChange={handleChange}>
        Show only active spaces
      </Checkbox>
      <Stack>{pages}</Stack>
      {!isLastPage && (
        <Button
          mt={2}
          mb={2}
          width={"full"}
          minH={"8vh"}
          size={"lg"}
          onClick={() => setCnt(cnt + 1)}
        >
          Load More
        </Button>
      )}

      {isLastPage && (
        <Alert
          mt={2}
          mb={2}
          status="error"
          // variant='subtle'
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          // height="10vh"
        >
          <AlertTitle fontSize="lg">End of Result</AlertTitle>
        </Alert>
      )}
    </Container>
  );
};

export default SpaceListPage;
