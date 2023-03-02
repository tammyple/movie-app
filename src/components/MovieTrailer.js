import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

function MovieTrailer({ movieTrailer }) {
  const youtubePath = `https://www.youtube-nocookie.com/embed/`;
  let trailer = movieTrailer.find((item) => item.type === "Trailer");
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
          image={`${youtubePath}${trailer.key}`}
          alt="trailer"
          autoPlay
        />
      </Card>
    </Box>
  );
}

export default MovieTrailer;
