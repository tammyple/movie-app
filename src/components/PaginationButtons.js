import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function PaginationButtons({ pageTitle }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        sx={{ spacing: 2, mt: 2, mb: 1, ml: "auto", mr: "auto" }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            component={Link}
            to={`/discover/${pageTitle}/${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
