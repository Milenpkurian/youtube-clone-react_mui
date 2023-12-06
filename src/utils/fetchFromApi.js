import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  //   method: "GET",
  //   url: BASE_URL,
  params: {
    // part: "snippet",
    // videoId: "M7FIvfx5J10",
    // regionCode: "IN",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error("Error in fetchFromApi:", error);
    throw error;
  }
};
