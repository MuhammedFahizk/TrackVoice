import React, { useState, useEffect } from 'react';
import Div from '../../components/Div';
import { fetchPlayLists } from '../../api/getApi';
import { FiPlus } from 'react-icons/fi';
import { addToPlayList, CreatePlaylist } from '../../api/PostAppi';
import { FaRegCircle, FaCircle } from "react-icons/fa";

const CreatePlayList = ({ handleClose, trackId }) => {
  const [playlists, setPlaylists] = useState([]); 
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchPlayLists();
        setPlaylists(data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    getPlaylists(); // Fetch playlists on component mount
  }, []);

  console.log(playlists);

  const handleCreatePlaylist = async () => {
    try {
      const createdPlaylist = await CreatePlaylist(newPlaylistName, trackId);
      console.log('New playlist created:', createdPlaylist);
      setPlaylists((prev) => [...prev, createdPlaylist]);
      setNewPlaylistName('');
      handleClose();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await addToPlayList(trackId, playlistId); // Call the API to add the track to the playlist
      handleClose();
      console.log(`Added to playlist: ${playlistId}`);
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };

  if (loading) {
    return <Div className="text-white">Loading playlists...</Div>;
  }

  return (
    <Div className="fixed inset-0 flex items-center justify-center bg-[#00000003] bg-opacity-50 z-50">
      <Div className="bg-gradient-to-t from-bg to-bgblack text-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add to Playlist</h2>

        {/* Existing Playlists */}
        <ul className="mb-4 max-h-24 overflow-y-auto no-scrollbar">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <li key={playlist._id} className="flex items-center justify-between mb-2">
                <span>{playlist.name}</span>
                <button onClick={() => handleAddToPlaylist(playlist._id)}>
                  {playlist.songs.includes(trackId) ? (
                    <FaCircle className="text-secondary text-xl" /> // Solid circle if track is added
                  ) : (
                    <FaRegCircle className=' text-xl'/> // Regular circle if track is not added
                  )}
                </button>
              </li>
            ))
          ) : (
            <Div className="text-gray-400">No playlists available</Div>
          )}
        </ul>

        {/* Divider */}
        <Div className="border-t border-gray-700 my-4"></Div>

        {/* Create New Playlist */}
        <h3 className="text-lg font-semibold mb-2">Create New Playlist</h3>
        <Div className={'flex gap-2 h-full items-center'}>
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-button text-white border border-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-button text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 w-fit"
          >
            <FiPlus  className='text-white'/>
          </button>
        </Div>

        {/* Close Modal */}
        <button
          onClick={handleClose}
          className="mt-4 text-gray-400 hover:text-white transition duration-300"
        >
          Cancel
        </button>
      </Div>
    </Div>
  );
};

export default CreatePlayList;
