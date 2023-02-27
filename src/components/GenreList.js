import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Button, Divider } from "@mui/material";
import MovieCard from "./MovieCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#1A2027",
  borderColor: "#1A2027",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "##DADFE1",
    borderColor: "#BFBFBF",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#95A5A6",
    borderColor: "#BFBFBF",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(238,238,238, 0.5)",
  },
});

function GenreList({ baseUrl, apiKey, posterPath, backdropPath }) {
  const [genreList, setGenreList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreId, setGenreId] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreList = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=en-US`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setGenreList(data.genres);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
      setLoading(false);
    };
    fetchGenreList();
  }, [apiKey, baseUrl]);

  useEffect(() => {
    const fetchMovieList = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setMovieList(data.results);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
      setLoading(false);
    };
    fetchMovieList();
  }, [apiKey, baseUrl, genreId]);
  useEffect(() => console.log("movieList", movieList), [movieList]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">DISCOVER MOVIES</Typography>
      <Stack
        minWidth="80%"
        flexDirection={{ md: "row" }}
        sx={{
          borderRadius: "10px",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Stack sx={{ width: "20%" }} spacing={2} mt={3}>
          {genreList.map((genre) => (
            <BootstrapButton
              onClick={() => setGenreId(genre.id)}
              key={genre.id}
            >
              {genre.name}
            </BootstrapButton>
          ))}
        </Stack>
        <Grid container direction="row" spacing={3} mt={3} ml={3}>
          {movieList.map((movie) => (
            <MovieCard movie={movie} posterPath={posterPath} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default GenreList;
