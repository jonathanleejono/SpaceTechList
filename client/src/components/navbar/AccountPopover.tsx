import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface AccountPopoverProps {
  shadow: string;
  menuBg: string;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ shadow, menuBg }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");

  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: "pointer" }}
          color="white"
          name="Adela Parkson" // icon initials
          bg="#11047A"
          size="sm"
          w="40px"
          h="40px"
        />
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="0px"
        mt="10px"
        borderRadius="20px"
        bg={menuBg}
        border="none"
      >
        <Flex w="100%" mb="0px">
          <Text
            ps="20px"
            pt="16px"
            pb="10px"
            w="100%"
            borderBottom="1px solid"
            borderColor={borderColor}
            fontSize="sm"
            fontWeight="700"
            color={textColor}
          >
            👋&nbsp; Hey, Adela
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Text fontSize="sm">Profile Settings</Text>
          </MenuItem>
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Text fontSize="sm">Log out</Text>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default AccountPopover;
