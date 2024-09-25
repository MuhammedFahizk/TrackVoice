import React, { useState } from 'react';
import Div from '../../components/Div';
import { formatDuration } from '../../Utils/formatDuration';
import { HeartFilled } from '@ant-design/icons';
import { removeLike, setCurrentSong } from '../../Redux/audioSlice';
import { useDispatch } from 'react-redux';
import { unLikedTrack } from '../../api/PostAppi'; // Assuming this is the function to unlike a track
import { notification } from 'antd'; // Import notification from Ant Design
import { CiCirclePlus } from "react-icons/ci";
import CreatePlayList from '../Playlist/CreatePlayList';

const ListSongs = ({ item, index }) => {
  const dispatch = useDispatch();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const handleOpenModal = () => setIsPlaylistModalOpen(true);
  const handleCloseModal = () => setIsPlaylistModalOpen(false);

  // Handle song click to set current song
  const handleSongClick = () => {
    console.log('Song clicked:', item); // Log to ensure it's triggered
    dispatch(setCurrentSong(item));
  };

  // Handle unlike functionality and trigger notification
  const handleLikeClick = async () => {
    try {
      // Call the API to unlike the track
      await unLikedTrack(item.id);
      console.log(`Track unliked: ${item.name}`);

      dispatch(removeLike(item.id))
      notification.success({
        message: 'Track Unliked',
        description: `${item.name} has been removed from your liked tracks.`,
        placement: 'bottomRight', // Set the notification to show at the bottom-right
      });

    } catch (error) {
      console.error('Error unliking the track:', error);
      
      // Show an error notification if there's an issue
      notification.error({
        message: 'Error',
        description: 'There was an issue unliking the track. Please try again.',
        placement: 'bottomRight',
      });
    }
  };

  return (
    <Div
      className="text-white h-12 items-center cursor-pointer py-1 gap-2 px-2 flex my-2 hover:bg-bg transition-300"
      onClick={handleSongClick}
    >
      <h1 className="w-5">{index + 1}</h1>
      <img src={item.album.images[0].url} className="w-12 rounded-md" alt="Album cover" />
      <Div>
        <h1 className="text font-semibold">{item.name}</h1>
        <Div className="flex gap-2 overflow-x-auto">
          {item.album.artists.map((artist, artistIndex) => (
            <h1 key={artistIndex} className="text-sm">
              {artist.name}
            </h1>
          ))}
        </Div>
      </Div>
      <Div className="ms-auto flex gap-4">
      <CiCirclePlus
          className="ms-auto text-lg cursor-pointer"
          onClick={handleOpenModal} // Open the modal when clicked
        />
        {isPlaylistModalOpen && (
          <CreatePlayList
          trackId={item.id}
            handleClose={handleCloseModal} // Close the modal
          />
        )}
        <HeartFilled
          className="ms-auto text-red-600 text-lg cursor-pointer"
          onClick={handleLikeClick} // Handle click to unlike
        />
        <h2 className="ms-auto">{formatDuration(item.duration_ms)}</h2>
      </Div>
    </Div>
  );
};

export default ListSongs;
