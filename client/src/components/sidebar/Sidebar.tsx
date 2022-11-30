// chakra imports
import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import Content from "components/sidebar/components/Content";
import { Scrollbars } from "react-custom-scrollbars-2";

function Sidebar(props: { routes: RoutesType[]; [x: string]: any }) {
  const { routes } = props;
  const variantChange = "0.2s linear";
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );

  // Chakra Color Mode
  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarMargins = "0px";

  return (
    <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export default Sidebar;
