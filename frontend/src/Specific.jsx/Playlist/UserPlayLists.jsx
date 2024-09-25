import React, { useEffect, useState } from 'react';
import Div from '../../components/Div';
import { fetchTracks } from '../../api/getApi';
import { addToQueue, removeFromQueue } from '../../Redux/audioSlice';
import { useDispatch } from 'react-redux';
import { FaRegHeart } from 'react-icons/fa'; // Import the like icon
import { PlayButton } from '../../components/PlayButton';
import { MdDeleteOutline } from "react-icons/md";
import { RiQuillPenLine } from "react-icons/ri";
import { deletePlaylist } from '../../api/deleteApi';

const UserPlayLists = ({ playlist, setSelectedTracks, setSelectedPlaylistId, selectedPlaylistId, onPlaylistDelete }) => {
  const [tracks, setTracks] = useState([]); // State to hold fetched tracks
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [isAddedToQueue, setIsAddedToQueue] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTracks = async () => {
      try {
        // Fetch tracks using the song IDs from the playlist
        const fetchedTracks = await fetchTracks(playlist.songs);
        setTracks(fetchedTracks); // Set the fetched tracks in state
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (playlist.songs.length > 0) {
      getTracks(); // Call the function if there are songs
    }
  }, [playlist.songs]); // Effect runs when playlist.songs changes

  // Update selected tracks if the current playlist is the selected one
  useEffect(() => {
    if (playlist._id === selectedPlaylistId) {
      setSelectedTracks(tracks); 
    }
  }, [selectedPlaylistId, tracks, playlist.id, setSelectedTracks]); // Dependency array to watch for changes

  const handleAddToQueue = () => {
    setIsAddedToQueue((prev) => !prev);
    
    if (!isAddedToQueue) {
      dispatch(addToQueue(tracks)); // Use fetched tracks instead of playlist.tracks.items
      console.log('Added to queue:', playlist.name);
    } else {
      dispatch(removeFromQueue(playlist.id));
      console.log('Removed from queue:', playlist.name);
    }
  };

  const handlePlaylistClick = () => {
    setSelectedPlaylistId(playlist._id);
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlist._id); // Call delete API
      console.log('Playlist deleted:', playlist.name);
      if (onPlaylistDelete) {
        onPlaylistDelete(playlist._id); // Notify parent component to remove the playlist
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <Div className={'shadow-lg inline-block p-2 items-center justify-center rounded-lg h-fit bg-[#310e0e6c] cursor-pointer'} onClick={handlePlaylistClick}>
      <Div className="flex items-center justify-center">
        <FaRegHeart className="text-white text-5xl" />
      </Div>
      <Div className={'p-2 flex flex-col gap-1 mx-3'}>
        <p className="text-white font-semibold">{playlist.description}</p>
        <h1 className="text-2xl text-center font-bold text-white">{playlist.name}</h1>
        <Div className={'flex gap-2 w-full justify-center'}>
          <p className="text-white text-center font-semibold text-sm">{playlist.songs.length} tracks</p>
        </Div>
      </Div>
      <Div className={'flex justify-between h-full items-center my-2'}>
        <PlayButton className={'mx-2'} onClick={handleAddToQueue} isPlaying={isAddedToQueue} />
        <div className='flex gap-2'>
          <RiQuillPenLine className='text-red-600 cursor-pointer' /> {/* You can implement edit functionality here */}
          <MdDeleteOutline className='text-red-600 cursor-pointer' onClick={handleDeletePlaylist} /> {/* Delete icon with handler */}
        </div>
      </Div>
    </Div>
  );
};

export default UserPlayLists;
