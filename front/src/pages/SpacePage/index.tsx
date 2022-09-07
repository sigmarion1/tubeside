import { useEffect, useRef, useState } from "react";

import {
  Box,
  Container,
  Spinner,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import useSpace from "../../hooks/useSpace";

import YouTube from "react-youtube";
import ChatWindow from "./ChatWindow";
import EnterModal from "./EnterModal";
import SpaceInfo from "./SpaceInfo";

// const socketPath = process.env.npm_package_name || "/";

// console.log(process.env.npm_package_proxy);

const socket = socketIOClient({
  transports: ["websocket"],
});

const SpacePage = () => {
  const youtubeBoxRef = useRef<HTMLInputElement>(null);
  const getCurrentYoutubeBoxHeight = () => {
    const height = youtubeBoxRef?.current?.clientHeight;

    return height || 500;
  };

  const { spaceId } = useParams();
  const [currentUserName, setCurrentUserName] = useState<string>("");
  // const [isSyncUser, setIsSyncUser] = useState<boolean>(false);
  const [userList, setUserList] = useState<string[]>([]);

  const { space, isLoading, isError, mutate } = useSpace(spaceId || "");
  const isSyncUser = space ? currentUserName === space.syncUser : false;

  const youtubePlayer = useRef<YouTube>(null);

  const [currentHeight, setCurrentHeight] = useState<number>(0);

  useEffect(() => {
    socket.on("client:space:joinSuccess", (userName) => {
      setCurrentUserName(userName);
    });

    socket.on("client:space:userChange", (userList) => {
      setUserList(userList);
      mutate();
    });

    socket.on("client:video:change", () => {
      mutate();
    });

    window.addEventListener("resize", () => {
      setCurrentHeight(getCurrentYoutubeBoxHeight());
    });

    return () => {
      socket.off("client:space:joinSuccess");
      socket.off("client:space:userChange");
      socket.off("client:video:change");
      window.location.reload();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSyncUser) {
        sendVideoSync();
      }
    }, 2000);

    socket.on("client:video:sync", (syncData) => {
      if (!isSyncUser) {
        receiveVideoSync(syncData);
      }
    });

    return () => {
      clearInterval(interval);
      socket.off("client:video:sync");
    };
  }, [isSyncUser]);

  const variantOpts = useBreakpointValue({
    base: { width: "100%", height: "180" },
    md: { width: "100%", height: currentHeight },
  });
  // const variantOpts = {
  //   playerVars: { controls: isSyncUser ? 1 : 0 },
  // };

  const handleUserNameSubmit = async (e: React.FormEvent, userName: string) => {
    e.preventDefault();
    if (userName.trim().length > 0) {
      socket.emit("space:join", userName, spaceId);
    }
  };

  const setVideoChange = async (videoId: string) => {
    socket.emit("video:change", spaceId, videoId);
  };

  const sendVideoSync = async () => {
    try {
      const currentTime =
        await youtubePlayer?.current?.internalPlayer?.getCurrentTime();
      const playerState =
        await youtubePlayer?.current?.internalPlayer?.getPlayerState();
      const playbackRate =
        await youtubePlayer?.current?.internalPlayer?.getPlaybackRate();

      const syncData = { playerState, currentTime, playbackRate };

      socket.emit("video:sync", spaceId, syncData);
    } catch (e) {
      console.log(e);
    }
  };

  type syncDataType = {
    playerState: number;
    currentTime: number;
    playbackRate: number;
  };

  const receiveVideoSync = async ({
    playerState,
    currentTime,
    playbackRate,
  }: syncDataType) => {
    try {
      const myCurrentTime =
        await youtubePlayer?.current?.internalPlayer.getCurrentTime();
      const myPlayerState =
        await youtubePlayer?.current?.internalPlayer.getPlayerState();
      const myPlaybackRate =
        await youtubePlayer?.current?.internalPlayer.getPlaybackRate();

      if (Math.abs(myCurrentTime - currentTime) > 2) {
        youtubePlayer?.current?.internalPlayer.seekTo(currentTime);
      }

      if (playerState === 1 && myPlayerState !== 1) {
        youtubePlayer?.current?.internalPlayer.playVideo();
      } else if (playerState !== 1) {
        youtubePlayer?.current?.internalPlayer.pauseVideo();
      }

      if (playbackRate !== myPlaybackRate) {
        youtubePlayer?.current?.internalPlayer.setPlaybackRate(playbackRate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading || isError) {
    return <Spinner />;
  }

  return (
    <Container maxW={"full"}>
      <Stack direction={"column"}>
        <Box flex={1}>
          <Stack
            mt={2}
            direction={{
              base: "column",
              md: "row",
            }}
            // justify={{ md: "center" }}
            height={{
              base: "auto",
              md: "80vh",
              // lg: "600",
              // xl: "700",
              // "2xl": "1000",
            }}
          >
            <Box flex={3} ref={youtubeBoxRef}>
              <YouTube
                videoId={space.currentVideoId}
                ref={youtubePlayer}
                opts={variantOpts}
                onReady={() => setCurrentHeight(getCurrentYoutubeBoxHeight())}
                // style={{ display: "flex", height: "100vh", width: "100%" }}

                // onPause={(e) => console.log(e.target.getPlayerState)}
              />
            </Box>
            <Box flex={1} maxH={{ base: "300px", md: "100%" }}>
              <ChatWindow
                socket={socket}
                currentUserName={currentUserName}
                spaceId={spaceId}
              />
            </Box>
          </Stack>
        </Box>

        <Box minHeight={150}>
          <SpaceInfo
            name={space.name}
            currentVideoName={space.currentVideoName}
            userList={userList}
            syncUser={space.syncUser}
            currentUserName={currentUserName}
            setVideoChange={setVideoChange}
          />
        </Box>
      </Stack>

      <EnterModal
        currentUserName={currentUserName}
        handleUserNameSubmit={handleUserNameSubmit}
      />
    </Container>
  );
};

export default SpacePage;
