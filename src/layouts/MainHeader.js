import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function MainHeader() {
  const auth = useAuth();
  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            variant={"rounded"}
            alt="The image"
            src={
              "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            }
            sx={{
              width: "100px",
              height: "30px",
              backgroundColor: "transparent",
            }}
          />
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Home
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Movie
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TV Show
          </Typography>
          <Search sx={{ flexGrow: 1, ml: 1, maxWidth: "300px", width: "100%" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box edge="end" sx={{ flexGrow: 1 }} />

          <AccountCircleIcon />
          <span>{auth.user?.username}</span>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              auth.logout(() => navigate("/"));
            }}
            startIcon={<LoginIcon sx={{ display: "inline" }} />}
            sx={{
              ml: 2,
              display: {
                xs: "none",
                sm: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            Sign Out
          </Button>

          <Box
            edge="end"
            sx={{ m: 0, flexGrow: 0, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
