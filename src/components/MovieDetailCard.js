import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

export default function MovieDetailCard({ movieDetail }) {
  const posterPath = `https://image.tmdb.org/t/p/original`;
  console.log("movie Detail", movieDetail);
  return (
    <>
      {movieDetail ? (
        <Card maxWidth="90%">
          <Stack
            minWidth="80%"
            flexDirection={{ xs: "column", md: "row" }}
            sx={{
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              sx={{ height: "500px", width: "400px", minWidth: "400px" }}
              image={`${posterPath}${movieDetail.poster_path}`}
              title={movieDetail.title}
            />
            <CardContent
              my={3}
              pl={{ xs: 0, md: 1 }}
              minHeight="100%"
              minWidth="400px"
              justifyContent="space-between"
            >
              <Typography gutterBottom variant="h5" component="div">
                {movieDetail.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movieDetail.overview}
              </Typography>
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Genres
                </Typography>
                {movieDetail.genres.map((item) => (
                  <Chip
                    key={`${item.id}`}
                    label={`${item.name}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Released date:
                </Typography>
                <Chip
                  label={`${movieDetail.release_date}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}
    </>
  );
}
