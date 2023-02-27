import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Stack, Divider } from "@mui/material";

export default function MovieTrendingList({ trendingMovies, posterPath }) {
  let location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5" my={3}>
        TRENDING NOW
      </Typography>

      <Divider />
      <Grid container direction="row" item xs={6} sm={4} md={3}>
        {trendingMovies.map((movie) => (
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
          // <Card key={movie.id}>
          //   <CardActionArea>
          //     <CardMedia
          //       sx={{ height: 140 }}
          //       image={`${posterPath}${movie.poster_path}`}
          //       title={movie.title}
          //       onClick={() => navigate(`/movie/${movie.id}`)}
          //       state={{ backgroundLocation: location }}
          //     />
          //   </CardActionArea>
          // </Card>
        ))}
      </Grid>
    </>
  );
}
