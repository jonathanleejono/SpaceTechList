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

import { Box, SimpleGrid } from "@chakra-ui/react";
import { showToastErrorsOnly } from "notifications/toast";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { getAllSpaceTechFromSavedList } from "state/spaceTech/spaceTechThunk";
import CheckTable from "views/admin/savedList/components/CheckTable";

const columnHeadingData = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "TOPIC",
    accessor: "topic",
  },
];

export default function SavedList() {
  const dispatch = useAppDispatch();
  const { spaceTechFromSavedList } = useAppSelector((store) => store.spaceTech);

  const handleFetchSpaceTechFromSavedList = useCallback(async () => {
    const resultAction = await dispatch(getAllSpaceTechFromSavedList());

    showToastErrorsOnly(
      resultAction,
      getAllSpaceTechFromSavedList,
      "Error fetching saved space tech"
    );
  }, [dispatch]);

  useEffect(() => {
    handleFetchSpaceTechFromSavedList();
  }, [handleFetchSpaceTechFromSavedList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        spacing={{ base: "20px", xl: "20px" }}
        maxWidth={1600}
      >
        <CheckTable
          columnHeadingData={columnHeadingData}
          tableData={spaceTechFromSavedList}
        />
      </SimpleGrid>
    </Box>
  );
}
