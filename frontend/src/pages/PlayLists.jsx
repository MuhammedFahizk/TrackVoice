import React, { useEffect, useState, useMemo } from 'react';
import { fetchPlaylists } from '../api/getApi'; // Adjust this path if necessary
import { useParams } from 'react-router-dom';
import Div from '../components/Div';
import Details from '../Specific.jsx/Playlist/Details';
import ListSongs from '../Specific.jsx/Playlist/ListSongs';

const PlayLists = () => {
  const { playlistId } = useParams(); // Correctly extract playlistId from URL parameters
  const [playlists, setPlaylists] = useState(null); // Changed to null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylists(playlistId); // Fetch playlists using playlistId
        setPlaylists((prevData) => (prevData !== data ? data : prevData)); // Avoid state change if data is the same
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPlaylists();
  }, [playlistId]);

  // Memoize the playlists data to prevent unnecessary re-renders
  const memoizedPlaylists = useMemo(() => playlists, [playlists]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
console.log(memoizedPlaylists);

  return (
    <Div className={'p-5'}>
      <Details playlists={memoizedPlaylists} />
      <ListSongs playlists={memoizedPlaylists} />
    </Div>
  );
};

export default React.memo(PlayLists); // Memoize the component to avoid re-renders if props are the same
