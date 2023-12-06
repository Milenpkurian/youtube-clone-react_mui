import { fetchFromAPI } from "./fetchFromApi";

export const fetchVideoDetail = async (id) => {
  try {
    const res = await fetchFromAPI(
      `videos?part=contentDetails,snippet,statistics&id=${id}`
    );
    if (!res) {
      console.log(res);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res;
    return data.items[0];
  } catch (error) {
    console.log(error);
    return [];
  }
};
