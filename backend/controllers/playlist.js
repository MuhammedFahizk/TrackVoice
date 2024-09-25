import Playlist from "../models/playList.js"; // Import with ES module syntax

export const getUserPlaylists = async (req, res) => {
  try {
    const { id } = req.user;
    const playlists = await Playlist.find({ user: id });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists", error });
  }
};

export const createPlaylist = async (req, res) => {
    try {
      const { name, description, isPublic } = req.body; 
      const { id: userId } = req.user; 
  
      if (!name || !userId) {
        return res.status(400).json({ message: "Name and user ID are required." });
      }
  
      const newPlaylist = new Playlist({
        name,
        description: description || '', 
        user: userId,
        isPublic: isPublic !== undefined ? isPublic : true 
      });
  
      await newPlaylist.save();
  
      res.status(201).json(newPlaylist);
    } catch (error) {
      res.status(500).json({ message: "Error creating playlist", error });
    }
  };

  export const addToPlayList = async (req, res) => {
    try {
      const { trackId, playlistId } = req.body;
      const { id: userId } = req.user; 
        console.log(trackId, playlistId );
        
      // Check if trackId and playlistId are provided
      if (!trackId || !playlistId || !userId) {
        return res.status(400).json({ message: "Track ID, Playlist ID, and user ID are required." });
      }
  
      // Find the playlist
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found." });
      }
  
      // Ensure the user owns the playlist
      if (playlist.user.toString() !== userId) {
        return res.status(403).json({ message: "You do not have permission to modify this playlist." });
      }
  
      if (playlist.songs.includes(trackId)) {
        return res.status(400).json({ message: "Track already in playlist." });
      }
  
      // Add track to playlist
      playlist.songs.push(trackId);
      await playlist.save();
  
      res.status(200).json({ message: "Track added to playlist successfully.", playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding to playlist", error });
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const {  playlistId } = req.params; // Extract playlist ID from request parameters
        const { id: userId } = req.user; // Get the user ID from the authenticated user
        console.log(playlistId);
        
        // Check if the playlist exists and belongs to the user
        const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
        
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or you do not have permission to delete this playlist." });
        }
        
        await Playlist.deleteOne({ _id: playlistId }); 
        
        res.status(200).json({ message: "Playlist deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting playlist", error });
    }
};