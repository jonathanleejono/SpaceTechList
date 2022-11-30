import {
  Button,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ToggleDarkLightMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarIcon = useColorModeValue("gray.400", "white");

  return (
    <Button
      variant="no-hover"
      bg="transparent"
      p="0px"
      minW="unset"
      minH="unset"
      h="18px"
      w="max-content"
      onClick={toggleColorMode}
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={navbarIcon}
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
};

export default ToggleDarkLightMode;
