import { fetchFromApi } from "./fetchFromApi";

export const fetchChannelDetail = async (id) => {
  try {
    const response = await fetchFromApi(
      `channels?part=snippet,statistics&id=${id}`
    );
    if (!response) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response;
    return data.items[0];
  } catch (error) {
    console.log(error);
    return [];
  }
};
