import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

import { Route, Routes } from "react-router-dom";

import theme from "./theme";

import NavBar from "./components/NavBar";
import SpaceListPage from "./pages/SpaceListPage";
import SpacePage from "./pages/SpacePage";
import NotFoundPage from "./pages/NotFoundPage";
import SpaceCreatePage from "./pages/SpaceCreatePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/space" element={<SpaceListPage />} />
      <Route path="/space/:spaceId" element={<SpacePage />} />
      <Route path="/create-space" element={<SpaceCreatePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </ChakraProvider>
);
