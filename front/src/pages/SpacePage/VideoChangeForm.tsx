import { useState } from "react";

import { Button, Input, Stack } from "@chakra-ui/react";

import { youtubeIdParser } from "../../utils/youtube";

interface VideoChangeProps {
  setVideoChange: (videoId: string) => void;
}

const VideoChangeForm = ({ setVideoChange }: VideoChangeProps) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUrl(e.currentTarget.value);
  };

  const handleVideoChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const youtubeId = youtubeIdParser(currentUrl);

    if (!youtubeId) {
      alert("wrong youtube video");
      return;
    }

    setVideoChange(youtubeId);
  };

  return (
    <form onSubmit={handleVideoChangeSubmit}>
      <Stack direction={"row"}>
        <Input
          placeholder="Please enter the url of youtube video"
          value={currentUrl}
          onChange={onChangeUrl}
          maxLength={500}
        ></Input>
        <Button type="submit">Change Video</Button>
      </Stack>
    </form>
  );
};

export default VideoChangeForm;
