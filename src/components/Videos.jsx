import { Box, Stack } from "@mui/material";
import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos, justifyContent, direction }) => {
  const justifyContentValue = justifyContent
    ? justifyContent
    : { xs: "center", md: "start" };
  // console.log(videos);
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent={justifyContentValue}
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
