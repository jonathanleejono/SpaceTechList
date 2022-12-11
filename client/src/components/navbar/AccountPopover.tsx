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
import { authRoute, loginRoute } from "constants/routes";
import { showToastErrorsOnly } from "notifications/toast";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { getUser, logoutUser } from "state/user/userThunk";

interface AccountPopoverProps {
  shadow: string;
  menuBg: string;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ shadow, menuBg }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleGetUser = useCallback(async () => {
    const resultAction = await dispatch(getUser());

    showToastErrorsOnly(resultAction, getUser, "Error fetching user details");
  }, [dispatch]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    toast.success("Logging out...");
    history.push(`${authRoute}/${loginRoute}`);
  };

  const { user } = useAppSelector((store) => store.user);

  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: "pointer" }}
          color="white"
          name={`${user.firstName} ${user.lastName}`} // icon initials
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
            👋&nbsp; Hey, {user.firstName}
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
            onClick={handleLogoutUser}
          >
            <Text fontSize="sm">Log out</Text>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default AccountPopover;
