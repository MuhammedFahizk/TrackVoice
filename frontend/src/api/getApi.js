import axios from "axios";
import axiosInstance from "./axiosInstence";
import { getAccessToken } from "../Utils/getAccessToken";

export const verifyUser = async () => {
  const response = await axiosInstance.get("/verify");
  return response.data;
};

export const fetchMusics = async (ids) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    const options = {
      method: "GET",
      url: "https://api.spotify.com/v1/browse/categories",

      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the obtained access token
      },
    };

    // Now fetch the music data using the access token
    const response = await axios.request(options);
    return response.data; // Return the data you need
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    ); // Log detailed error
    throw new Error("Error fetching music data");
  }
};

export const fetchCategoryPlaylists = async (categoryId) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    const options = {
      method: "GET",
      url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, // Corrected endpoint
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the obtained access token
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category playlists:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching playlists for the selected category");
  }
};

export const fetchPlaylists = async (playlistId) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    const options = {
      method: "GET",
      url: `https://api.spotify.com/v1/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching playlists:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching playlists for the selected category");
  }
};

export const fetchTracks = async (ids) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    // Construct the URL for the API call
    const url = `https://api.spotify.com/v1/tracks?ids=${ids.join(",")}`;

    const options = {
      method: "GET",
      url: url, // Use the constructed URL
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the obtained access token
      },
    };

    const response = await axios.request(options);
    return response.data.tracks; // Return the array of tracks from the response
  } catch (error) {
    console.error(
      "Error fetching tracks:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching tracks for the selected IDs");
  }
};

export const fetchPlayLists = async () => {
    try {
      const response = await axiosInstance.get(`/playlists`); // Make sure to include the playlistId in the URL
      return response.data; // Return the single playlist data
    } catch (error) {
      console.error(
        "Error fetching playlist by ID:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error fetching playlist by ID");
    }
  };
  
// api/getApi.js
export const fetchFriends = async (searchTerm = '') => {
    try {
      // Make sure to encode the search term if needed
      const response = await axiosInstance.get(`/getFriends`, {
        params: { search: searchTerm }, // Send search term as a query parameter
      });
      return response.data; // Return the fetched friends data
    } catch (error) {
      console.error(
        "Error fetching friends:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error fetching friends");
    }
  };
  
  export const searchFriends = async (searchTerm) => {
    try {
      const response = await axiosInstance.get('/getFriends', {
        params: { search: searchTerm }, // Pass the search term as a query parameter
      });
      return response.data; // Return the filtered friends data from the response
    } catch (error) {
      console.error(
        "Error searching friends:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error searching friends"); // Throw an error for the calling function to handle
    }
  };
  

  export const analysis= async (trackID) => {
    try {
      // Get the access token
      const accessToken = await getAccessToken();
  
      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/tracks/${trackID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching track:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error fetching track for the selected category");
    }
  };
  