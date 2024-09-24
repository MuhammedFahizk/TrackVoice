import axios from "axios";
import axiosInstance from "./axiosInstence";
import { getAccessToken } from "../Utils/getAccessToken";

export const verifyUser = async () => {
    const response = await axiosInstance.get('/verify');
    return response.data; 
};

export const fetchMusics = async (ids) => {
    try {
        // Get the access token
        const accessToken = await getAccessToken();

        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/browse/categories',
            
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the obtained access token
            },
        };

        // Now fetch the music data using the access token
        const response = await axios.request(options);
        return response.data; // Return the data you need
    } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message); // Log detailed error
        throw new Error('Error fetching music data');
    }
};



export const fetchCategoryPlaylists = async (categoryId) => {
    try {
        // Get the access token
        const accessToken = await getAccessToken();

        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, // Corrected endpoint
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the obtained access token
            },
        };
      
        const response = await axios.request(options); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching category playlists:', error.response ? error.response.data : error.message);
        throw new Error('Error fetching playlists for the selected category');
    }
};



export const fetchPlaylists = async (playlistId) => {
    try {
        // Get the access token
        const accessToken = await getAccessToken();

        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${playlistId}`, // Corrected endpoint
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the obtained access token
            },
        };

        const response = await axios.request(options); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching playlists:', error.response ? error.response.data : error.message);
        throw new Error('Error fetching playlists for the selected category');
    }
};

