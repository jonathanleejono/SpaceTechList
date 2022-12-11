import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { capitalCase } from "change-case";
import Card from "components/card/CardBase";
import { showToast } from "notifications/toast";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { addSpaceTech } from "state/spaceTech/spaceTechThunk";

export default function SpaceTechCard(props: {
  idCode: string;
  title: string;
  description: string;
  mediaUrl: string;
  topic: string;
  disableSave: boolean;
}) {
  const { idCode, mediaUrl, title, description, topic, disableSave } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const buttonTextColor = useColorModeValue("brand.500", "white");

  const dispatch = useAppDispatch();

  const { savedSpaceTechIdCodes } = useAppSelector((store) => store.spaceTech);

  const spaceTech = { idCode, mediaUrl, title, description, topic };

  const handleSaveSpaceTech = async () => {
    if (savedSpaceTechIdCodes.includes(idCode)) {
      toast.error("Can not save duplicate space tech");
      return;
    }

    const resultAction = await dispatch(addSpaceTech(spaceTech));

    showToast(
      resultAction,
      addSpaceTech,
      "Saved space tech!",
      "Error saving space tech"
    );
  };

  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={mediaUrl}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius="20px"
          />
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                {title}
              </Text>
              <Text
                color="secondaryGray.700"
                fontSize={{
                  base: "sm",
                }}
                fontWeight="500"
                me="14px"
              >
                {description}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align={{
              base: "center",
              md: "start",
              lg: "center",
              xl: "start",
              "2xl": "center",
            }}
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt="25px"
          >
            <Text fontWeight="700" fontSize="sm" color={buttonTextColor}>
              {capitalCase(topic.toString())}
            </Text>
            <Box
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
            >
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
                disabled={disableSave}
                onClick={handleSaveSpaceTech}
              >
                Save
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
