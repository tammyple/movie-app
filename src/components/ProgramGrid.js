import React from "react";
import { Grid } from "@mui/material";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";
import PaginationButtons from "../components/PaginationButtons";
import Stack from "@mui/material/Stack";

function ProgramGrid({ pageTitle, discoverList, posterPath }) {
  return (
    <div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "90%",
            ml: 2,
            mr: 2,
          }}
        >
          <Typography
            variant="h5"
            my={3}
            style={{ textTransform: "capitalize" }}
          >
            {`DISCOVER ${pageTitle}`.toUpperCase()}
          </Typography>

          <Grid item mt={1}>
            <MovieList movies={discoverList} posterPath={posterPath} />
          </Grid>

          <Stack spacing={2}>
            <PaginationButtons pageTitle={pageTitle} />
          </Stack>
        </Grid>
      </main>
    </div>
  );
}

export default ProgramGrid;
