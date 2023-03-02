import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import LoadingScreen from "../components/LoadingScreen";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Avatar } from "@mui/material";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

export default function MainHeader() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;

  const auth = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchSearchMovies = async () => {
      try {
        const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchValue}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setSearchMovies(data.results);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchSearchMovies();
  }, [apiKey, baseUrl, searchValue]);

  useEffect(() => console.log(searchMovies), [searchMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LiveTvIcon
            sx={{
              width: "100px",
              height: "30px",
              backgroundColor: "transparent",
            }}
          />
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
            sx={{
              wrap: "noWrap",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Home
          </Button>

          <Button
            variant="h6"
            component="div"
            sx={{
              wrap: "noWrap",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => navigate(`/discover/movies/1`)}
          >
            Movies
          </Button>
          <Button
            variant="h6"
            component="div"
            sx={{
              wrap: "noWrap",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => navigate(`/discover/tv/1`)}
          >
            TV
          </Button>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              ml: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <Button type="submit" sx={{ p: "10px" }} aria-label="search">
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : (
                    <SearchIcon />
                  )}
                </>
              )}
            </Button>
          </Paper>

          <Box edge="end" sx={{ flexGrow: 1 }} />
          <Avatar
            variant="text"
            sx={{
              ml: 2,
              display: {
                xs: "none",
                md: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Typography>{auth.user?.username.charAt(0)}</Typography>
          </Avatar>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => {
              auth.logout(() => navigate("/"));
            }}
            startIcon={<LoginIcon sx={{ display: "inline" }} />}
            sx={{
              ml: 2,
              wrap: "noWrap",
              display: {
                xs: "none",
                md: "flex",
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
            sx={{
              m: 0,
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
            }}
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
