import { Box, Flex } from "@chakra-ui/react";
import SpaceTechListImage from "assets/img/SPACETECHLIST_WHITEBG.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Box margin={4} mb={10}>
        <img
          src={SpaceTechListImage}
          alt="space tech list image"
          className="logo"
          height="100px"
          width="230px"
        />
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
