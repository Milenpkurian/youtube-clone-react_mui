import { fetchFromApi } from "./fetchFromApi";

export const fetchChannelVideos = async (id) => {
  try {
    const response = await fetchFromApi(
      `search?part=snippet,id&channelId=${id}&order=date`
    );
    if (!response) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response;
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
