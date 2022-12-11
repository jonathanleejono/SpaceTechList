import {
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { capitalCase } from "change-case";
import Card from "components/card/CardBase";
import SavedListTableMenu from "components/menu/MainMenu";
import { showToast } from "notifications/toast";
import { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useAppDispatch } from "state/hooks";
import { deleteSpaceTech } from "state/spaceTech/spaceTechThunk";

export default function CheckTable(props: {
  columnHeadingData: any;
  tableData: any;
}) {
  const { columnHeadingData, tableData } = props;

  const columns = useMemo(() => columnHeadingData, [columnHeadingData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;

  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [checkedItems, setCheckedItems] = useState([]);

  const dispatch = useAppDispatch();

  const handleDeleteSpaceTech = async () => {
    Object.values(checkedItems).forEach(async (spaceTechId: number) => {
      const resultAction = await dispatch(
        deleteSpaceTech(spaceTechId.toString())
      );

      showToast(
        resultAction,
        deleteSpaceTech,
        "Removed space tech!",
        "Error removing space tech"
      );
    });

    setCheckedItems([]);
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Check Table
        </Text>
        <SavedListTableMenu
          handleDeleteSpaceTechFunction={handleDeleteSpaceTech}
        />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.500"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data;
                  if (cell.column.Header === "ID") {
                    data = (
                      <Flex align="center">
                        <Checkbox
                          colorScheme="brandScheme"
                          me="10px"
                          onChange={() => {
                            if (checkedItems.includes(cell.value)) {
                              setCheckedItems((prevCheckedItems) =>
                                prevCheckedItems.filter(
                                  (item) => item !== cell.value
                                )
                              );
                            } else {
                              setCheckedItems((prevCheckedItems) => [
                                ...prevCheckedItems,
                                cell.value,
                              ]);
                            }
                          }}
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "TITLE") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DESCRIPTION") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOPIC") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {capitalCase(cell.value)}
                      </Text>
                    );
                  }

                  const isCellHeaderEqualToDescription =
                    cell.column.Header === "DESCRIPTION";

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{
                        sm: isCellHeaderEqualToDescription ? "300px" : "150px",
                        md: "200px",
                        lg: "auto",
                      }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
