import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Stack } from "@mui/material";
import { fetchChannelDetail } from "../utils/fetchChannelDetail";
import { fetchChannelVideos } from "../utils/fetchChannelVideos";
import { ChannelCard, Videos } from "../components";

const ChannelDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["channel", id],
    queryFn: async () => {
      try {
        const channelDetail = await fetchChannelDetail(id);
        const channelVideos = await fetchChannelVideos(id);
        return { channelDetail, channelVideos };
      } catch (error) {
        console.log(error);
      }
    },
  });
  const channelDetail = data?.channelDetail;
  const channelVideos = data?.channelVideos;
  // console.log(channelDetail, channelVideos);

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(6,6,234,1) 22%, rgba(2,0,36,1) 92%)",
            zIndex: 10,
            height: "200px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex">
        {isLoading ? (
          <CircularProgress
            sx={{ position: "fixed", top: "80%", right: "50%" }}
          />
        ) : (
          <Videos justifyContent="center" videos={channelVideos || []} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
