import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, Button } from "@mui/material";
import MovieCard from "./MovieCard";
import LoadingScreen from "./LoadingScreen";

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

  useEffect(() => {
    const fetchGenreList = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=en-US`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setGenreList(data.genres);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
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
  // useEffect(() => console.log("movieList", movieList), [movieList]);

  return (
    <Box sx={{ width: "100vw", pl: 5, pr: 5 }}>
      <Box
        sx={{
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography variant="h5">MOVIES BY GENRE</Typography>
      </Box>
      <Stack
        sx={{
          borderRadius: "10px",
          justifyContent: "space-between",
          alignItems: "start",
          minWidth: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Stack sx={{ width: "120px", ml: 1 }} spacing={2} mt={3}>
          {genreList.map((genre) => (
            <BootstrapButton
              onClick={() => setGenreId(genre.id)}
              key={genre.id}
            >
              {genre.name}
            </BootstrapButton>
          ))}
        </Stack>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {errorMessage ? (
              <div style={{ color: "red" }}>{errorMessage}</div>
            ) : (
              <Grid container direction="row" spacing={2} mt={1} ml={3} mr={3}>
                {movieList.map((movie) => (
                  <Grid key={movie.id} item xs={10} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} posterPath={posterPath} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default GenreList;
