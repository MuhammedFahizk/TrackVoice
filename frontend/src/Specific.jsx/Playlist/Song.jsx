import React, { useState } from 'react';
import Div from '../../components/Div';
import { formatDuration } from '../../Utils/formatDuration';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, addLike, removeLike } from '../../Redux/audioSlice'; // Import the necessary actions
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { likedTrack, unLikedTrack } from '../../api/PostAppi'; // Assuming there's an unLikedTrack function
import { notification } from 'antd';
import { CiCirclePlus } from "react-icons/ci";
import CreatePlayList from './CreatePlayList';

const Song = ({ item, index }) => {
  const { likedIds } = useSelector((state) => state.audio);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const isLiked = likedIds.some(id => id === item.track.id); // Check if the track is liked
  const dispatch = useDispatch();
  
  const handleSongClick = () => {
    dispatch(setCurrentSong(item.track));
  };
  const handleOpenModal = () => setIsPlaylistModalOpen(true);
  const handleCloseModal = () => setIsPlaylistModalOpen(false);

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent triggering the song click event
    const trackId = item.track.id;

    try {
      if (isLiked) {
        // Unlike the track if it's already liked
        await unLikedTrack(trackId);
        dispatch(removeLike(trackId)); // Remove from liked IDs
        notification.success({
          message: 'Track Unliked',
          description: `You unliked the track: ${item.track.name}`,
          placement: 'bottomRight',
          duration: 2,
        });
      } else {
        // Like the track if it's not already liked
        await likedTrack(trackId);
        dispatch(addLike(trackId)); // Add to liked IDs
        notification.success({
          message: 'Track Liked',
          description: `You liked the track: ${item.track.name}`,
          placement: 'bottomRight',
          duration: 2,
        });
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
      notification.error({
        message: 'Error',
        description: `There was an issue ${isLiked ? 'unliking' : 'liking'} the track. Please try again.`,
        placement: 'bottomRight',
        duration: 2,
      });
    }
  };

  return (
    <Div
      className="text-white h-12 items-center cursor-pointer py-1 gap-2 px-2 flex my-2 hover:bg-bg transition-300"
      onClick={handleSongClick}
    >
      <h1 className="w-5">{index + 1}</h1>
      <img src={item.track.album.images[0].url} className="w-12 rounded-md" alt="Album cover" />
      <Div>
        <h1 className="text font-semibold">{item.track.name}</h1>
        <Div className="flex gap-2 overflow-x-auto">
          {item.track.album.artists.map((artist, index) => (
            <h1 key={index} className="text-sm">
              {artist.name}
            </h1>
          ))}
        </Div>
      </Div>
      <Div className="ms-auto flex gap-4 items-center h-full">
      <CiCirclePlus
          className="ms-auto text-lg cursor-pointer"
          onClick={handleOpenModal} // Open the modal when clicked
        />
        {isPlaylistModalOpen && (
          <CreatePlayList
          trackId={item.track.id}
            handleClose={handleCloseModal} // Close the modal
          />
        )}
        {isLiked ? (
          <HeartFilled
            className="ms-auto text-red-600 text-lg cursor-pointer"
            onClick={handleLikeClick}
          />
        ) : (
          <HeartOutlined
            className="ms-auto text-lg cursor-pointer"
            onClick={handleLikeClick}
          />
        )}
        <h2 className="ms-auto">{formatDuration(item.track.duration_ms)}</h2>
      </Div>
    </Div>
  );
};

export default Song;
