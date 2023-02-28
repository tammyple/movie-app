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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { FormProvider } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";
import LiveTvIcon from "@mui/icons-material/LiveTv";

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
          console.log(JSON.stringify(data));
          setSearchMovies(data.results);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
      setLoading(false);
    };
    fetchSearchMovies();
  }, [apiKey, baseUrl, searchValue]);
  useEffect(() => console.log("searchMovies", searchMovies), [searchMovies]);

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
            sx={{ wrap: "noWrap", display: { xs: "none", sm: "block" } }}
          >
            Home
          </Button>

          <Button
            variant="h6"
            component="div"
            sx={{ wrap: "noWrap", display: { xs: "none", sm: "block" } }}
            onClick={() => navigate(`/discover/movies/1`)}
          >
            Movies
          </Button>
          <Button
            variant="h6"
            component="div"
            sx={{
              wrap: "noWrap",
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => navigate(`/discover/tv/1`)}
          >
            TV
          </Button>
          <FormProvider>
            <TextField
              id="search-bar"
              className="text"
              onInput={(e) => {
                setSearchValue(e.target.value);
              }}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {errorMessage ? (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                ) : (
                  <IconButton
                    onClick={() => navigate(`/search/${searchValue}`)}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </>
            )}
          </FormProvider>

          <Box edge="end" sx={{ flexGrow: 1 }} />
          <AccountCircleIcon />
          <Typography>{auth.user?.username}</Typography>

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
