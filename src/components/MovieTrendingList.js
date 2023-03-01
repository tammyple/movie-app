import * as React from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import Carousel from "../components/Carousel";
import "../components/Carousel.css";

export default function MovieList({ movies, posterPath }) {
  return (
    <>
      <div style={{ width: "100%", pr: 1, pl: 1 }}>
        <Carousel show={4} infiniteLoop withIndicator>
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={6} sm={4} md={3}>
              <MovieCard key={movie.id} movie={movie} posterPath={posterPath} />
            </Grid>
          ))}
        </Carousel>
      </div>
    </>
  );
}
