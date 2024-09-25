import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Div from '../../components/Div';
import { PlayButton } from '../../components/PlayButton';
import { addToQueue, removeFromQueue } from '../../Redux/audioSlice';

const Details = ({ playlists }) => {
  const dispatch = useDispatch();
  const [isAddedToQueue, setIsAddedToQueue] = useState(false);
  
  // Selector to get the current song's state
  const currentSong = useSelector((state) => state.audio.currentSong);
  
  const isPlaying = currentSong && currentSong.trackId === playlists.id; // Adjust based on how you identify the current song

  const handleAddToQueue = () => {
    setIsAddedToQueue((prev) => !prev);

    if (!isAddedToQueue) {
      dispatch(addToQueue(playlists.tracks.items));
      console.log('Added to queue:', playlists.name);
    } else {
      dispatch(removeFromQueue(playlists.id));
      console.log('Removed from queue:', playlists.name);
    }
  };

  return (
    <Div className={'shadow-lg flex p-2 rounded-lg bg-[#310e0e2c]'}>
      <img className='w-48 rounded-xl object-cover' src={playlists.images[0].url} alt="" />
      
      <Div className={'p-2 flex flex-col gap-1 mx-3'}>
        <p className='text-white font-semibold'>{playlists.description}</p>
        <h1 className='text-5xl font-bold text-white'>{playlists.name}</h1>

        <div className='mt-6 flex items-center h-full gap-2'>
          <PlayButton onClick={handleAddToQueue} isPlaying={isAddedToQueue} />
          <Div className={'flex gap-2'}>
            <p className='text-white font-semibold text-sm'>{playlists.tracks.total} tracks</p>
            <p className='text-white font-semibold text-sm'>{playlists.followers.total} followers</p>
            <p className='text-white font-semibold text-sm'>{isAddedToQueue ? 'Added to queue' : 'Not in queue'}</p>
          </Div>
        </div>
      </Div>
    </Div>
  );
};

export default Details;
