import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "../components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideosCategory } from "../utils/fetchVideosCategory";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  //useQuery usage
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data", selectedCategory],
    queryFn: () => fetchVideosCategory(selectedCategory),
  });
  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
          visibility={{ md: "visible", sm: "hidden" }}
        >
          Copyright@2023 M
        </Typography>
      </Box>

      <Box
        p={2}
        sx={{
          overflow: "auto",
          height: "90vh",
          flex: 2,
          pl: { xs: "auto", md: 7 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
            textAlign: { md: "left", xs: "center" },
          }}
        >
          {selectedCategory}
          <span style={{ color: "#F31503" }}> Videos</span>
        </Typography>
        {isLoading ? (
          <CircularProgress
            sx={{ position: "fixed", top: "50%", right: "50%" }}
          />
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
