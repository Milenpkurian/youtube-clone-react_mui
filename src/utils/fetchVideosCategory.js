import { fetchFromAPI } from "./fetchFromApi.js";

export const fetchVideosCategory = async (selectedCategory) => {
  try {
    const response = await fetchFromAPI(
      `search?part=snippet&q=${selectedCategory}`
    );
    if (!response) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response;
    // console.log(data.items);
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
