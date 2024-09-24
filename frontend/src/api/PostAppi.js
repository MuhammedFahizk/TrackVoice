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