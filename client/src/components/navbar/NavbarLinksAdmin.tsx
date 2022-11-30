import { Flex, useColorModeValue } from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import ToggleDarkLightMode from "components/navbar/ToggleDarkLightMode";
import ToggleSidebar from "components/sidebar/ToggleSidebar";
import PropTypes from "prop-types";
import routes from "routes";
import AccountPopover from "./AccountPopover";

export default function NavbarLinksAdmin(props: { secondary: boolean }) {
  const { secondary } = props;

  // Chakra Color Mode
  const menuBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: "10px", md: "unset" };
          }
          return "unset";
        }}
        me="10px"
        borderRadius="30px"
      />
      <ToggleSidebar routes={routes} />
      <ToggleDarkLightMode />
      <AccountPopover shadow={shadow} menuBg={menuBg} />
    </Flex>
  );
}

NavbarLinksAdmin.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
  secondary: PropTypes.bool,
};
