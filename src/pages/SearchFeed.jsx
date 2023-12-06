import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchSearchVideos } from "../utils/fetchSearchVideos";
import { Videos } from "../components";

const SearchFeed = () => {
  const { searchterm } = useParams();
  //useQuery usage
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", searchterm],
    queryFn: () => fetchSearchVideos(searchterm,null),
  });
  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        p={2}
        sx={{
          overflow: "auto",
          height: "90vh",
          flex: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          Search results for
          <span style={{ color: "#F31503" }}> {searchterm} </span>:
        </Typography>
        {isLoading ? (
          <CircularProgress
            sx={{ position: "fixed", top: "50%", right: "50%" }}
          />
        ) : (
          <Videos justifyContent="center" videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default SearchFeed;
