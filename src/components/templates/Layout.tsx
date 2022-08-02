import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../organisms/ResponsiveAppBar";

function Layout() {
  return (
    <Box>
      {/* gnb */}
      <ResponsiveAppBar />

      {/* main */}
      <Container maxWidth={"lg"}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
