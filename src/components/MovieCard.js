import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";

function MovieCard({ movie, posterPath }) {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: "300px", width: "200px" }}
          image={`${posterPath}${movie.poster_path}`}
          alt={movie.original_title}
          onClick={() => navigate(`/movie/${movie.id}`)}
          state={{ backgroundLocation: location }}
        />
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
