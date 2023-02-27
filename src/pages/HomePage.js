import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { MovieFilter } from "@mui/icons-material";
import { Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MovieTrendingList from "../components/MovieTrendingList";
import GenreList from "../components/GenreList";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  let navigate = useNavigate();

  const apiKey = `681565f353a3b4d3df92168a51105ce9`;
  const baseUrl = `https://api.themoviedb.org/3/`;
  const posterPath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const url = `${baseUrl}/trending/all/day?api_key=${apiKey}`;
        const res = await fetch(url);
        // const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          console.log(JSON.stringify(data));
          setTrendingMovies(data.results);

          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchTrendingMovies();
  }, [apiKey, baseUrl]); //detect when baseUrl & apiKey changes
  // useEffect(
  //   () => console.log("trending movies", trendingMovies),
  //   [trendingMovies]
  // ); // clg movies when movies changed

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
                }}
              >
                <Grid item direction="column" mt={1}>
                  <MovieTrendingList
                    trendingMovies={trendingMovies}
                    posterPath={posterPath}
                  />
                </Grid>
                <Grid item mt={5}>
                  <GenreList baseUrl={baseUrl} apiKey={apiKey} />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
