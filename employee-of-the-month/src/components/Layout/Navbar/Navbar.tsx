import React, { useState } from "react";

import {
  AccountBox,
  ListAlt,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Hidden,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthState } from "../../../context/Auth";

const authorizedRoutes = [
  {
    label: "Profile",
    href: "/profile",
    icon: <AccountBox />,
  },
  {
    label: "Recognition Form",
    href: "/recognition-form",
    icon: <ListAlt />,
  },
];
const mobileAuthorizedRoutes = [
  {
    label: "Logout",
    href: "/logout",
    icon: <Logout />,
    color: "error.main",
  },
];
const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { user, logout } = useAuthState();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const MenuIconButton = (
    <IconButton onClick={handleDrawerToggle}>
      <MenuIcon />
    </IconButton>
  );

  const isLoggedIn = Boolean(user);
  const navigationItems: {
    label: string;
    href: string;
    icon: React.ReactNode;
    color?: "error";
  }[] = isLoggedIn
    ? authorizedRoutes.concat(isMobile ? mobileAuthorizedRoutes : [])
    : [];

  return (
    <>
      <AppBar position="fixed" color="default">
        <Container>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={64}
          >
            {navigationItems?.length > 0 && (
              <Hidden smUp>{MenuIconButton}</Hidden>
            )}
            <Link to={"/"}>
              <Typography
                variant="h6"
                color={"primary"}
                sx={{ cursor: "pointer" }}
              >
                Employee of the Month
              </Typography>
            </Link>
            <Hidden smDown>
              <Stack direction={"row"} gap={2}>
                {navigationItems.map((item) => (
                  <Link key={item.label} to={item.href}>
                    <Typography>{item.label}</Typography>
                  </Link>
                ))}
              </Stack>
            </Hidden>
            {user && isLoggedIn ? (
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Link to={"/profile"}>
                  <Typography variant={"body1"}>Hello {user.name}</Typography>
                </Link>
                <Hidden smDown>
                  <Stack
                    direction={"row"}
                    gap={2}
                    alignItems={"center"}
                    sx={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    <Icon color="error">
                      <Logout />
                    </Icon>
                    <Typography variant={"body1"}>Logout</Typography>
                  </Stack>{" "}
                  <Divider orientation={"vertical"} flexItem />
                </Hidden>
              </Stack>
            ) : (
              <Link to={"/login"}>
                <Typography>Login</Typography>
              </Link>
            )}
          </Stack>
        </Container>
      </AppBar>
      {navigationItems?.length > 0 && (
        <Box component={"nav"}>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            PaperProps={{ sx: { width: 240 } }}
          >
            <List>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                {MenuIconButton}
                <Typography color={"primary"}>Employee of the month</Typography>
              </Stack>
              <Divider />
              {navigationItems.map((item) => (
                <Link to={item.href}>
                  <ListItemButton key={item.label} color={item.color}>
                    <ListItemIcon sx={{ color: item.color }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default Navbar;
