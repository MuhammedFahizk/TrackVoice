import React, { useEffect, useState, useMemo } from 'react';
import { fetchPlaylists } from '../api/getApi'; // Adjust this path if necessary
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addPrevPlayLists } from '../Redux/audioSlice'; // Adjust this import based on your structure
import Div from '../components/Div';
import Details from '../Specific.jsx/Playlist/Details';
import ListSongs from '../Specific.jsx/Playlist/ListSongs';

const PlayLists = () => {
  const { playlistId } = useParams(); // Correctly extract playlistId from URL parameters
  const [playlists, setPlaylists] = useState(null); // Changed to null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylists(playlistId);
        setPlaylists((prevData) => (prevData !== data ? data : prevData));
       dispatch(addPrevPlayLists(playlistId));

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
      <Details playlists={memoizedPlaylists} /> {/* Pass the handler */}
      <ListSongs playlists={memoizedPlaylists} />
    </Div>
  );
};

export default React.memo(PlayLists);
