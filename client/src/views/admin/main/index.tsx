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

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import SpaceTechCard from "components/card/SpaceTechCard";
import Banner from "views/admin/main/components/Banner";

// Assets
import { showToastErrorsOnly } from "notifications/toast";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import {
  getAllSpaceTechFromPublicApi,
  getAllSpaceTechFromSavedList,
} from "state/spaceTech/spaceTechThunk";

export default function Main() {
  const dispatch = useAppDispatch();
  const { spaceTechFromPublicApi, savedSpaceTechIdCodes } = useAppSelector(
    (store) => store.spaceTech
  );

  const handleFetchSpaceTechFromPublicApi = useCallback(async () => {
    const resultAction = await dispatch(getAllSpaceTechFromPublicApi());

    showToastErrorsOnly(
      resultAction,
      getAllSpaceTechFromPublicApi,
      "Error fetching space tech"
    );
  }, [dispatch]);

  // needed to check savedSpaceTechIdCodes
  const handleFetchSpaceTechFromSavedList = useCallback(async () => {
    const resultAction = await dispatch(getAllSpaceTechFromSavedList());

    showToastErrorsOnly(
      resultAction,
      getAllSpaceTechFromSavedList,
      "Error fetching saved space tech"
    );
  }, [dispatch]);

  useEffect(() => {
    handleFetchSpaceTechFromPublicApi();
    handleFetchSpaceTechFromSavedList();
  }, [handleFetchSpaceTechFromPublicApi, handleFetchSpaceTechFromSavedList]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(2, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Space Tech
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {spaceTechFromPublicApi?.map((spaceTech) => {
                return (
                  <SpaceTechCard
                    key={spaceTech.idCode}
                    idCode={spaceTech.idCode}
                    title={spaceTech.title}
                    description={spaceTech.description}
                    topic={spaceTech.topic}
                    mediaUrl={spaceTech.mediaUrl}
                    disableSave={savedSpaceTechIdCodes.includes(
                      spaceTech.idCode
                    )}
                  />
                );
              })}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
