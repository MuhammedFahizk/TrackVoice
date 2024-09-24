import React from 'react';
import Div from '../../components/Div';
import { formatDuration } from '../../Utils/formatDuration';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { setCurrentSong } from '../../Redux/audioSlice';

const Song = ({ item, index }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
    const state = useSelector(state => state)
  const handleSongClick = () => {
    // Dispatch the selected song to the Redux state
    dispatch(setCurrentSong(item.track));
  };
  return (
    <Div
      className="text-white h-12 items-center cursor-pointer py-1 gap-2 px-2 flex my-2 hover:bg-bg transition-300"
      onClick={handleSongClick} // Trigger on click
    >
      <h1 className="w-5">{index + 1}</h1>
      <img src={item.track.album.images[0].url} className="w-12 rounded-md" alt="no image" />
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
      <h2 className="ms-auto">{formatDuration(item.track.duration_ms)}</h2>
    </Div>
  );
};

export default Song;
