import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import GenreList from "../components/GenreList";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";

function MoviePage() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}/discover/movie?api_key=${apiKey}`;
        const res = await fetch(url);
        // const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setDiscoverMovies(data.results);

          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchDiscoverMovies();
  }, [apiKey, baseUrl]); //detect when baseUrl & apiKey changes
  useEffect(
    () => console.log("trending movies", discoverMovies),
    [discoverMovies]
  ); // clg movies when movies changed

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <>
              <Grid
                container
                direction="column"
                justifyContent={{ md: "center", xs: "flex-end" }}
                sx={{
                  minHeight: "100vh",
                  ml: 2,
                  mr: 2,
                }}
              >
                <Typography variant="h5" my={3}>
                  DISCOVER MOVIES
                </Typography>
                <Grid item mt={1}>
                  <MovieList movies={discoverMovies} posterPath={posterPath} />
                </Grid>
                <Grid item mt={5}>
                  <GenreList
                    baseUrl={baseUrl}
                    apiKey={apiKey}
                    posterPath={posterPath}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MoviePage;
