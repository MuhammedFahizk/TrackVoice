import React, { useEffect, useState } from 'react';
import Div from '../components/Div';
import { fetchPlayLists } from '../api/getApi';
import UserPlayLists from '../Specific.jsx/Playlist/UserPlayLists';
import ListSongs from '../Specific.jsx/Like/ListSongs';

const Playlist = () => {
  const [selectedTracks, setSelectedTracks] = useState([]); // State to hold fetched tracks
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const handleDeletePlaylist = (deletedId) => {
    setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist._id !== deletedId));
  };
  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchPlayLists();
        setPlaylists(data);
        setLoading(false);
        if (data.length > 0) {
          setSelectedPlaylistId(data[2]._id); 
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    getPlaylists();
  }, []);

  return (
    <Div>
      {loading ? (
        <p>Loading playlists...</p>
      ) : playlists.length > 0 ? (
        <Div className="playlists-list gap-2 grid grid-cols-4 p-5 h-[240px] overflow-x-auto w-full no-scrollbar">
          {playlists.map((playlist, index) => (
            <UserPlayLists
              key={index}
              setSelectedPlaylistId={setSelectedPlaylistId}
              playlist={playlist}
              selectedPlaylistId={selectedPlaylistId}
              setSelectedTracks={setSelectedTracks}
              onPlaylistDelete={handleDeletePlaylist}
            />
          ))}
        </Div>
      ) : (
        <p>No playlists found for this category.</p>
      )}
      {selectedTracks.length > 0 && (
        <Div  className={'px-5 py-5'}>
        {selectedTracks.map((track, index) => (
            <ListSongs key={index} index={index} item={track}/>
        ))}
        </Div>
      )}
    </Div>
  );
};

export default Playlist;
