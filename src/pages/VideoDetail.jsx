import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchVideoDetail } from "../utils/fetchVideoDetail";
import he from "he";
import { CheckCircle } from "@mui/icons-material";
import { formatNumber } from "../utils/formatNumber";
import { Videos } from "../components";
import { fetchSearchVideos } from "../utils/fetchSearchVideos";

const VideoDetail = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      try {
        const videoDetail = await fetchVideoDetail(id);
        const relatedVideos = await fetchSearchVideos(null, id);
        return { videoDetail, relatedVideos };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return (
      <Box minHeight="95vh">
        <CircularProgress
          sx={{ position: "fixed", top: "80%", right: "50%" }}
        />
      </Box>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }
  if (isError) {
    return <p>Error loading data</p>;
  }

  const {
    videoDetail: {
      snippet: { title, channelId, channelTitle } = {},
      statistics: { viewCount, likeCount } = {},
    } = {},
    relatedVideos = {},
  } = data ?? {};

  return (
    <Box minHeight="95vh">
      <Stack
        direction={{ xs: "column", md: "row" }}
        display="flex"
        justifyContent="center"
        alignItems={{ xs: "center", md: "inherit" }}
      >
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography
              color="#fff"
              variant="h6"
              fontWeight={isSmallScreen ? "subtitle1" : "bold"}
              p={2}
            >
              {he.decode(title)}
            </Typography>
            <Stack
              direction={isSmallScreen ? "column-reverse" : "row"}
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={isSmallScreen ? "subtitle1" : "h6"}
                  color="#fff"
                >
                  {he.decode(channelTitle)}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {formatNumber(viewCount)} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {formatNumber(likeCount)} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos
            justifyContent="center"
            videos={relatedVideos}
            direction="column"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
