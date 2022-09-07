import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { AlertIcon } from "@chakra-ui/react";
import React, { useState } from "react";

import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function SpaceCreatePage() {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await axios.post("/v1/spaces", {
        name,
        isPrivate,
      });

      const createdSpaceId = result.data?.id;

      if (createdSpaceId) {
        navigate(`/space/${createdSpaceId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message);
      }
    }

    // console.log(result);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(c.target.checked);
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create your space</Heading>
          <Text fontSize={"lg"}>to enjoy video with your friends!!</Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Space name</FormLabel>
                <Input
                  required
                  maxLength={20}
                  value={name}
                  onChange={onChangeName}
                  placeholder="Genji's Space"
                />
              </FormControl>
              {/* <FormControl id="creator">
                <FormLabel>Creator name</FormLabel>
                <Input
                  required
                  maxLength={20}
                  placeholder="Genji"
                  value={creator}
                  onChange={onChangeCreator}
                />
              </FormControl> */}
              <FormControl id="isPrivate">
                <Checkbox checked={isPrivate} onChange={handleChange}>
                  Private space
                </Checkbox>
              </FormControl>
              <Text as="sup">
                Only members who get the link can join this space
              </Text>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              )}

              <Divider />
              <Stack spacing={10}>
                <Button
                  colorScheme="red"
                  bgColor={"red.500"}
                  color="White"
                  type="submit"
                >
                  Create Space
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
