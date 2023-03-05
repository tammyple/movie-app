import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Typography, Grid } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { fetchData } from "../api/getApi";

function SearchPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let { query } = useParams();

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    setLoading(true);
    const fetchSearchMovies = async () => {
      try {
        const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${query}`;
        const data = await fetchData(url);
        setSearchMovies(data.results);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchSearchMovies();
  }, [apiKey, baseUrl, query]);

  return (
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
      {" "}
      <Typography variant="h5" mb={2} mt={3}>
        MOVIES SEARCH QUERY: "{query}"
      </Typography>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <Grid
              container
              direction="row"
              sx={{ mt: 3, pr: 3, pl: 3, width: "100%" }}
              spacing={3}
            >
              {searchMovies.map((movie) => (
                <Grid item xs={6} sm={4} md={3}>
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    posterPath={posterPath}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </main>
  );
}

export default SearchPage;
