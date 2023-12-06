import { fetchFromApi } from "./fetchFromApi";

export const fetchSearchVideos = async (searchTerm, id) => {
  try {
    const params = `search?part=snippet,id`;

    let res;
    if (searchTerm) {
      res = await fetchFromApi(`${params}&q=${searchTerm}`);
    } else {
      res = await fetchFromApi(`${params}&relatedToVideoId=${id}&type=video`);
    }

    if (!res) {
      throw new Error(`HTTP ERROR: STATUS ${res.status}`);
    }

    return (await res).items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
