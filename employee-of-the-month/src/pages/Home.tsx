import { Stack } from "@mui/material";
import React from "react";
import HomeOverview from "../components/HomeOverview/HomeOverview";

const HomePage: React.FC = () => {
  return (
    <Stack gap={2}>
      <HomeOverview />
    </Stack>
  );
};

export default HomePage;
