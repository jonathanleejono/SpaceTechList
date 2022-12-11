/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { showToast, showToastErrorsOnly } from "notifications/toast";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { getUser, updateUser } from "state/user/userThunk";

export default function Profile() {
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const dispatch = useAppDispatch();

  const handleGetUser = useCallback(async () => {
    const resultAction = await dispatch(getUser());

    showToastErrorsOnly(resultAction, getUser, "Error fetching profile");
  }, [dispatch]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  const { user } = useAppSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const currentUser = { firstName, lastName, email };

  const handleEditUser = async () => {
    if (!firstName || !lastName || !email) {
      toast.error("Please fill out all fields");
      return;
    }

    const resultAction = await dispatch(updateUser(currentUser));

    showToast(
      resultAction,
      updateUser,
      "Updated profile!",
      "Error updating profile"
    );
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Flex
          zIndex="0"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="email"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(event) => {
                const { value } = event.target;
                setEmail(value);
              }}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              First Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="firstName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              placeholder="First Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={firstName}
              onChange={(event) => {
                const { value } = event.target;
                setFirstName(value);
              }}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Last Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="lastName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              placeholder="Last Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={lastName}
              onChange={(event) => {
                const { value } = event.target;
                setLastName(value);
              }}
            />
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleEditUser}
            >
              Save Changes
            </Button>
          </FormControl>
        </Flex>
      </Grid>
    </Box>
  );
}
