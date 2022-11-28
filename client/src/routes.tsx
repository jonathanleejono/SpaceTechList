import { Icon } from "@chakra-ui/react";
import { authRoute, registerRoute } from "constants/routes";
import { MdBarChart, MdHome, MdLock, MdPerson } from "react-icons/md";

// Admin Imports
import DataTables from "views/admin/dataTables";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";

// Auth Imports
import Register from "views/auth/register";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: authRoute,
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Register",
    layout: authRoute,
    path: registerRoute,
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: Register,
  },
];

export default routes;
