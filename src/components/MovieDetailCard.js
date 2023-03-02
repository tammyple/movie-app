import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack, Box, Avatar, Grid, IconButton } from "@mui/material";
import MovieCard from "./MovieCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewsIcon from "@mui/icons-material/Reviews";

export default function MovieDetailCard({
  movieDetail,
  similarMovies,
  posterPath,
}) {
  return (
    <>
      {movieDetail && similarMovies ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pl: 3,
            pr: 3,
            pt: 2,
          }}
        >
          <Card
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              width="90vw"
              flexDirection={{ xs: "column", md: "row" }}
              sx={{
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <CardMedia
                sx={{ height: "500px", width: "350px", minWidth: "300px" }}
                image={`${posterPath}${movieDetail.poster_path}`}
                title={movieDetail.title}
              />
              <CardContent
                my={3}
                pl={{ xs: 0, md: 1 }}
                sx={{
                  minHeight: "100%",
                  minWidth: "300px",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom variant="h4" component="div">
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
                    Genres:
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
                <Stack
                  my={{ xs: 2, md: 1 }}
                  sx={{
                    display: "flex",
                    flexDirection: { md: "column", lg: "row" },
                    alignItems: "start",
                  }}
                >
                  <Typography
                    mr={1}
                    variant="caption"
                    sx={{ display: "block" }}
                  >
                    Production Countries:
                  </Typography>
                  <Box>
                    {movieDetail.production_countries.map((item) => (
                      <Chip
                        key={`${item.iso_3166_1}`}
                        label={`${item.name}`}
                        size="small"
                        variant="contained"
                      />
                    ))}
                  </Box>
                </Stack>
                <Stack
                  my={{ xs: 2, md: 1 }}
                  sx={{
                    display: "flex",
                    flexDirection: { md: "column", lg: "row" },
                    alignItems: "start",
                  }}
                >
                  <Typography
                    mr={1}
                    variant="caption"
                    sx={{ display: "block" }}
                  >
                    Production Companies:
                  </Typography>
                  <Box>
                    {movieDetail.production_companies
                      .slice(0, 3)
                      .map((item) => (
                        <Chip
                          key={`${item.id}`}
                          label={`${item.name}`}
                          avatar={
                            <Avatar
                              alt={`${item.name}`}
                              src={
                                item.logo_path &&
                                `${posterPath}${item.logo_path}`
                              }
                            />
                          }
                          size="small"
                          variant="contained"
                        />
                      ))}
                  </Box>
                </Stack>
                <Stack
                  my={{ xs: 2, md: 1 }}
                  sx={{
                    display: "flex",
                    flexDirection: { md: "column", lg: "row" },
                    alignItems: "start",
                  }}
                >
                  <IconButton sx={{ borderRadius: 0, pl: 0 }}>
                    <FavoriteIcon style={{ color: "#D91E18" }} />
                    <Typography
                      mr={1}
                      variant="caption"
                      sx={{ display: "block" }}
                    >
                      Popularity: {movieDetail.popularity}
                    </Typography>
                  </IconButton>
                  <IconButton sx={{ borderRadius: 0, pl: 0 }}>
                    <ReviewsIcon style={{ color: "#3FC380" }} />
                    <Typography
                      mr={1}
                      variant="caption"
                      sx={{ display: "block" }}
                    >
                      Vote Count: {movieDetail.vote_count}
                    </Typography>
                  </IconButton>
                </Stack>
              </CardContent>
            </Stack>
          </Card>
          {/* Similar Movies */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              mt: 3,
            }}
          >
            <Typography variant="h4">More Like This</Typography>
            {similarMovies &&
            similarMovies !== null &&
            similarMovies.length !== 0 ? (
              <Grid container direction="row" mt={3} spacing={3}>
                {similarMovies?.map((movie) => (
                  <Grid key={movie.id} item xs={6} sm={4} md={3}>
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      posterPath={posterPath}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" mt={2}>
                Sorry, no similar movies found.
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}
    </>
  );
}
