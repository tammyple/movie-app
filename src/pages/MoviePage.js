import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";
import PaginationButtons from "../components/PaginationButtons";
import Stack from "@mui/material/Stack";
import LoadingScreen from "../components/LoadingScreen";

function MoviePage() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { pageId } = useParams();
  const pageTitle = `movies`;

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${pageId}`;
        const res = await fetch(url);
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
  }, [apiKey, baseUrl, pageId]); //detect when baseUrl & apiKey changes
  useEffect(
    () => console.log("trending movies", discoverMovies),
    [discoverMovies]
  ); // clg movies when movies changed

  return (
    <div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "90%",
            ml: 2,
            mr: 2,
          }}
        >
          <Typography variant="h5" my={3}>
            DISCOVER MOVIES
          </Typography>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {errorMessage ? (
                <div style={{ color: "red" }}>{errorMessage}</div>
              ) : (
                <>
                  <Grid item mt={1}>
                    <MovieList
                      movies={discoverMovies}
                      posterPath={posterPath}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
          <Stack spacing={2}>
            <PaginationButtons pageTitle={pageTitle} />
          </Stack>
        </Grid>
      </main>
    </div>
  );
}

export default MoviePage;
