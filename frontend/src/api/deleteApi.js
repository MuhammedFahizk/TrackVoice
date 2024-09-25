import axiosInstance from "./axiosInstence";

export const deletePlaylist = async(playlistId ) => {
    try {
        const response = await axiosInstance.delete(`/playlists/${playlistId}`)
        return response.data;
    }
    catch(error){
        console.error(error);
        }
}