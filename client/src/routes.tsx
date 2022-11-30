import { Icon } from "@chakra-ui/react";
import {
  adminRoute,
  authRoute,
  loginRoute,
  mainRoute,
  profileRoute,
  registerRoute,
  savedListRoute,
} from "constants/routes";
import { MdBarChart, MdHome, MdLock, MdPerson } from "react-icons/md";

// Admin Imports
import Main from "views/admin/main";
import Profile from "views/admin/profile";
import DataTables from "views/admin/savedList";

// Auth Imports
import Register from "views/auth/register";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: adminRoute,
    path: mainRoute,
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Main,
  },
  {
    name: "Saved List",
    layout: adminRoute,
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: savedListRoute,
    component: DataTables,
  },
  {
    name: "Profile",
    layout: adminRoute,
    path: profileRoute,
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: authRoute,
    path: loginRoute,
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
