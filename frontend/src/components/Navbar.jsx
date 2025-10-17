//Navbar.jsx
import React, { use } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModePreference,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useProductStore } from "../Store/product";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={"1140px"}
      px={4}
      //bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-r, cyan.400, #1318b8ff)"
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
