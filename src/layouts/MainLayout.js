import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader
        pages={[
          { label: "Home", path: "/" },
          { label: "Movies", path: "/discover/movies/1" },
          { label: "TV", path: "/discover/tv/1" },
        ]}
      />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}

export default MainLayout;
