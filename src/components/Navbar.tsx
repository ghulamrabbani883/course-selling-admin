import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { parseToken, userState } from "../state/atoms/adminatom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Navbar = () => {
  const navigate = useNavigate();
  const token = parseToken();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const setUserState = useSetRecoilState(userState);
  const { isAuthenticated } = useRecoilValue(userState);

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUserState((prev) => {
      return { ...prev, isUserLoading: true };
    });
    localStorage.removeItem("courseToken");
    setUserState((prev) => {
      return {
        ...prev,
        isAuthenticated: false,
        isUserLoading: false,
        user: null,
      };
    });
    navigate("/");
    // window.location.reload();
  };

  useEffect(() => {
    if (token === "null" || token === "undefined" || !token) {
      setUserState((prev) => {
        return { ...prev, isAuthenticated: false };
      });
    } else {
      setUserState((prev) => {
        return { ...prev, isAuthenticated: true };
      });
    }
  }, []);

  return (
    <>
      <CssBaseline>
        <AppBar position="relative">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              display="flex"
              justifyContent="spaceBetween"
              alignItems="center"
            >
              <Link to="/">
                <IconButton
                  size="large"
                  edge="start"
                  // color="white"
                  sx={{ mr: 2, color: "white" }}
                >
                  <SchoolIcon />
                </IconButton>
              </Link>

              <Link to="/">
                <Typography variant="h5" color="white">
                  Course Selling
                </Typography>
              </Link>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap={3}
              sx={{
                "@media screen and (min-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {isAuthenticated ? (
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                gap={3}
                sx={{
                  "@media screen and (max-width: 900px)": {
                    display: "none",
                  },
                }}
              >
                <Link to="/courses">
                  <Button variant="contained" startIcon={<SchoolIcon />}>
                    Courses
                  </Button>
                </Link>

                <Link to="/about">
                  <Button variant="contained" startIcon={<SchoolIcon />}>
                    Create-Course
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  LogOut
                </Button>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                gap={3}
                sx={{
                  "@media screen and (max-width: 900px)": {
                    display: "none",
                  },
                }}
              >
                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </Box>
            )}

            {/* Drawer sidebar  */}
            <SwipeableDrawer
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onOpen={() => setIsDrawerOpen(true)}
            >
              <Box
                sx={{
                  height: "50px",
                  borderBottom: "1px solid red",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Link to="/">
                  <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <SchoolIcon fontSize="small" />
                  </IconButton>
                </Link>
                <Link to="/" color="primary">
                  <Typography
                    variant="h5"
                    color="white"
                    sx={{ fontSize: "16px" }}
                  >
                    Course Selling
                  </Typography>
                </Link>
              </Box>
              {isAuthenticated ? (
                <List dense={true}>
                  <ListItem>
                    <ListItemButton>
                      <Link to="/courses">
                        <Button variant="contained" color="primary">
                          Courses
                        </Button>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Link to="/about">
                        <Button variant="contained" color="primary">
                          Create-Course
                        </Button>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                      >
                        LogOut
                      </Button>
                    </ListItemButton>
                  </ListItem>
                </List>
              ) : (
                <List dense={true}>
                  <ListItem>
                    <ListItemButton>
                      <Link to="/login">
                        <Button variant="contained" color="primary">
                          Login
                        </Button>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Link to="/register">
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                        >
                          Register
                        </Button>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
            </SwipeableDrawer>
          </Toolbar>
        </AppBar>
      </CssBaseline>
    </>
  );
};

export default Navbar;
