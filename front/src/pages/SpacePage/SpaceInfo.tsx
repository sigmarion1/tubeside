import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import UserBadge from "./UserBadge";
import VideoChangeForm from "./VideoChangeForm";

interface spaceInfoProps {
  name: string;
  userList: string[];
  syncUser: string;
  currentVideoName: string;
  currentUserName: string;
  setVideoChange: (videoId: string) => void;
}

const SpaceInfo = ({
  name,
  userList,
  syncUser,
  currentVideoName,
  currentUserName,
  setVideoChange,
}: spaceInfoProps) => {
  const userCount = userList.length;
  const isSyncUser = currentUserName === syncUser;

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      paddingTop={2}
      // maxHeight={"200px"}
    >
      <Box flex={3}>
        <Stack direction={"column"} height={"100%"}>
          <Box>
            <Heading>{name}</Heading>
          </Box>

          <Text
            // fontSize={"lg"}
            // fontWeight={200}
            // textAlign={"center"}
            // fontSize="2xl"
            noOfLines={1}
          >
            {currentVideoName}
          </Text>
          {isSyncUser && <VideoChangeForm setVideoChange={setVideoChange} />}
        </Stack>
      </Box>
      <Box flex={1}>
        {" "}
        <Box rounded={"lg"} bgColor={"teal.500"}>
          <Text textAlign={"center"}>{userCount} watching</Text>
        </Box>
        <Box
          maxH={"100%"}
          flex={1}
          sx={{ overflowY: "scroll" }}
          m={2}
          // p={1}
          //   bg={useColorModeValue("gray.400", "gray.600")}
        >
          {userList.map((userName, index) => (
            <UserBadge
              userName={userName}
              currentUserName={currentUserName}
              isSyncUser={userName === syncUser}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default SpaceInfo;
