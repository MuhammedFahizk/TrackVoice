import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Div from "../components/Div"; // Assuming this is your styled component
import { fetchTracks } from "../api/getApi"; // Function to fetch tracks
import ListSongs from "../Specific.jsx/Like/ListSongs";
import { PlayButton } from "../components/PlayButton";
import { addToQueue, removeFromQueue } from "../Redux/audioSlice";

const Like = () => {
  const dispatch = useDispatch();
  const { likedIds } = useSelector((state) => state.audio);
  const [likedTracks, setLikedTracks] = useState([]);
  const [isAddedToQueue, setIsAddedToQueue] = useState(false);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        // Fetch the liked tracks using the liked IDs
        const tracks = await fetchTracks(likedIds);
        setLikedTracks(tracks); // Set the fetched liked tracks in state
      } catch (error) {
        console.error("Error fetching liked tracks:", error);
      }
    };

    if (likedIds.length > 0) {
      fetchLikedTracks(); // Only fetch if there are liked IDs
    }
  }, [likedIds]);

  const handleAddToQueue = () => {
    setIsAddedToQueue((prev) => !prev);

    if (!isAddedToQueue) {
      dispatch(addToQueue(likedTracks)); // Add liked tracks to queue
    } else {
      dispatch(removeFromQueue(likedTracks)); // Remove liked tracks from queue
    }
  };

  console.log(likedTracks);

  return (
    <Div className={'p-4'}>
      <Div className={'shadow-lg flex p-2 rounded-lg bg-[#310e0e2c]'}>
        <img className='w-48 rounded-xl object-cover' alt="" />
        <Div className={'p-2 flex flex-col gap-1 mx-3'}>
          <p className='text-white font-semibold'>Play list</p>
          <h1 className='text-5xl font-bold text-white'>Liked Songs</h1>
          <div className='mt-6 flex items-center h-full gap-2'>
            <PlayButton onClick={handleAddToQueue} isPlaying={isAddedToQueue} />
            <Div className={'flex gap-2'}>
              <p className='text-white font-semibold text-sm'>{likedTracks.length} tracks</p>
            </Div>
          </div>
        </Div>
      </Div>
      <Div>
        {likedTracks.map((track, index) => (
          <ListSongs key={track.id || index} index={index} item={track} />
        ))}
      </Div>
    </Div>
  );
};

export default Like;
