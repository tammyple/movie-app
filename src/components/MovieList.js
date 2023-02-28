import * as React from "react";
import { Grid } from "@mui/material";
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
