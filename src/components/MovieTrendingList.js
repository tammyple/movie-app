import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Stack, Divider } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieTrendingList({ trendingMovies, posterPath }) {
  let location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5" my={3}>
        TRENDING NOW
      </Typography>

      <Grid container direction="row" mt={3} spacing={3}>
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} posterPath={posterPath} />
        ))}
      </Grid>
    </>
  );
}
