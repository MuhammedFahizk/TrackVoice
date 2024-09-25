import axiosInstance from "./axiosInstence";

export const signupUser = async (data) => {
    try {
      const response = await axiosInstance.post('/signup', data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };

  export const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/login', data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };


// Assuming trackId is part of the item.track object
export const likedTrack = async (trackId) => {
  try {
    const response = await axiosInstance.post(`/like/${trackId}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
};

export const unLikedTrack = async (trackId) => {
  try {
    const response = await axiosInstance.post(`/unLike/${trackId}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
};



export const CreatePlaylist = async (name, trackId) => {
  try {
    const requestBody = {
      name,
      trackId, 
    };

    const response = await axiosInstance.post(`/createPlaylist`, requestBody); 

    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
};


export  const addToPlayList = async ( trackId,playlistId) => {
  try {
    const requestBody = {
      trackId,
      playlistId, 
    };

    const response = await axiosInstance.post(`/addToPlayList`, requestBody); 

    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
}


export  const addToFriend = async ( friendId) => {
  try {
    const requestBody = {
      friendId,
 
    };

    const response = await axiosInstance.post(`/addToFriend`, requestBody); 

    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
}


export  const removeToFriend = async ( friendId) => {
  try {
    const requestBody = {
      friendId,
    };

    const response = await axiosInstance.post(`/removeToFriend`, requestBody); 

    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response ? error.response.data : error;
  }
}



