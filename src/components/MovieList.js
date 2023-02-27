import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Stack, Divider } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieList({ movies, posterPath }) {
  return (
    <>
      <Grid container direction="row" mt={3} spacing={3}>
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={6} sm={4} md={3}>
            <MovieCard key={movie.id} movie={movie} posterPath={posterPath} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
