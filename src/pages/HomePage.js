import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import GenreList from "../components/GenreList";
import { Typography } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import MovieTrendingList from "../components/MovieTrendingList";
import { fetchData } from "../api/getApi";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      const url = `${baseUrl}trending/all/day?api_key=${apiKey}`;
      const data = await fetchData(url);
      if (data !== "Fetching is not available") {
        setTrendingMovies(data.results);
      } else {
        setErrorMessage();
      }
      setLoading(false);
    };
    fetchTrendingMovies();
  }, [apiKey, baseUrl]);

  return (
    <>
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
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            ml: 2,
            mr: 2,
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              width: "100%",
              ml: 2,
              mr: 2,
              mt: 1,
            }}
          >
            <Typography variant="h5" my={3}>
              TRENDING NOW
            </Typography>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {errorMessage ? (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                ) : (
                  <>
                    <MovieTrendingList
                      movies={trendingMovies}
                      posterPath={posterPath}
                    />
                  </>
                )}
              </>
            )}
          </Grid>
          <Grid item mt={5}>
            <GenreList
              apiKey={apiKey}
              baseUrl={baseUrl}
              posterPath={posterPath}
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default HomePage;
