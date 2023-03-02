import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LoadingScreen from "./LoadingScreen";

function MovieTrailer({ movieTrailer }) {
  const youtubePath = `http://www.youtube.com/embed/`;
  // let item = movieTrailer[Math.floor(Math.random() * movieTrailer.length)];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pl: 3,
        pr: 3,
        pt: 2,
      }}
    >
      <Card
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
        }}
      >
        <CardMedia
          component="iframe"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            maxHeight: "400px",
            display: { sm: "block", md: "flex" },
          }}
          frameBorder="0"
          image={`${youtubePath}${movieTrailer[0].key}`}
          // image={`http://www.youtube.com/embed/uAMsKHaqRfQ`}
          alt="trailer"
          autoPlay
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movieTrailer.name}
          </Typography>
        </CardContent> */}
      </Card>
    </Box>
  );
}

export default MovieTrailer;
