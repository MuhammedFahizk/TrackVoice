import React, { useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import Div from "../../components/Div";
import { useSelector, useDispatch } from "react-redux";
import { FaPause, FaPlay } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiInfinityLine } from "react-icons/ri";
import { TbInfinityOff } from "react-icons/tb";
import { nextSong, previousSong } from "../../Redux/audioSlice";
import { analysis } from "../../api/getApi";
import axios from "axios";

const PlayDiv = () => {
  const { currentSong, queue } = useSelector((state) => state.audio);
  const dispatch = useDispatch(); 
  const audioRef = useRef(null);
  const scrollRef = useRef(null); // Scroll reference
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); 
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); 
  const [isLooping, setIsLooping] = useState(false); 
  const [analysisData, setAnalysisData] = useState(null); // State for analysis data
  console.log(analysisData);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const data = await analysis(currentSong.id);
        setAnalysisData(data); // Store the analysis data
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    if (currentSong) {
      fetchAnalysisData();
    }
    
    if (currentSong && audioRef.current) {
      audioRef.current.volume = volume; 
      if (isPlaying) {
        audioRef.current.play(); 
      }

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.onended = () => {
        if (isLooping) {
          audioRef.current.currentTime = 0; 
          audioRef.current.play(); 
        } else {
          dispatch(nextSong()); 
        }
      };
    }
  }, [currentSong, isPlaying, volume, isLooping, dispatch]); 

  useEffect(() => {
    setIsLooping(false);
  }, [currentSong]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); 
      } else {
        audioRef.current.play(); 
      }
      setIsPlaying(!isPlaying); 
    }
  };

  // Auto-scroll effect for the artist's list
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      let scrollAmount = 0;

      const scroll = () => {
        scrollContainer.scrollLeft += 1; // Scroll by 1 pixel
        scrollAmount += 1;

        // Check if we've scrolled to the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0; // Reset to start
        }
      };

      // Set the scroll interval
      const intervalId = setInterval(scroll, 50); // Adjust speed by interval

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [currentSong]); // Re-trigger effect when song changes

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value; 
    }
  };

  const handleSeekChange = (value) => {
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value; 
    }
  };

  const toggleLooping = () => {
    setIsLooping(!isLooping); 
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; 
  };

  return (
    <Div className="col-span-1 bg-secondary rounded-lg h-[400px] p-4 flex flex-col items-center relative">
      {currentSong ? (
        <>
          <Div className={"flex flex-col gap-4"}>
            <h1 className="text-white font-semibold">{currentSong.name}</h1>
            <img
              src={currentSong.album.images[0].url}
              alt="album art"
              className="w-56 rounded-md object-cover"
            />
          </Div>

          <audio
            ref={audioRef} 
            src={currentSong?.preview_url} 
          />
          <div className={`circle ${isPlaying ? "playing" : ""}`} />
          <Div className={"w-full flex h-fit items-center justify-center"}>
            <button
              onClick={toggleLooping}
              className="bg-transparent border-none cursor-pointer flex justify-center items-center w-10 h-10"
            >
              {isLooping ? (
                <RiInfinityLine className="text-xl text-white" /> 
              ) : (
                <TbInfinityOff className="text-xl text-white" /> 
              )}
            </button>
            <button
              onClick={() => dispatch(previousSong())} 
              className="bg-transparent border-none cursor-pointer flex justify-center items-center w-10 h-10"
            >
              <GiPreviousButton className="text-xl text-white" />
            </button>
            <button
              onClick={handlePlayPause}
              className="bg-transparent border-none cursor-pointer flex justify-center items-center w-10 h-10"
            >
              {isPlaying ? (
                <FaPause className="text-xl text-white" /> 
              ) : (
                <FaPlay className="text-xl text-white" /> 
              )}
            </button>
            <button
              onClick={() => dispatch(nextSong())} 
              className="bg-transparent border-none cursor-pointer flex justify-center items-center w-10 h-10"
            >
              <GiNextButton className="text-xl text-white" />
            </button>
            <Slider
              defaultValue={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              style={{ width: "30%" }}
            />
          </Div>

          <Div className="text-white mt-2 flex h-full gap-2 items-center justify-between w-full">
            <span>{formatDuration(currentTime)}</span> 
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              step={0.1}
              onChange={handleSeekChange}
              style={{ width: "80%" }}
            />
            <span>{formatDuration(duration)}</span> 
          </Div>

          {/* Artists scrolling list */}
          <Div
            ref={scrollRef}
            className="flex text-white gap-2 overflow-x-auto h-56 whitespace-nowrap w-56 no-scrollbar scrollbar-hide"
          >
            {currentSong.artists.map((item, index) => (
              <h3 key={index} className="inline-block font-thin text-md">
                {item.name}
              </h3>
            ))}
          </Div>

          {/* Analysis data display (example) */}
          {analysisData && (
            <Div className="mt-4 text-white">
              <h2>Analysis Data:</h2>
              <pre>{JSON.stringify(analysisData, null, 2)}</pre> {/* Displaying analysis data as JSON for debugging */}
            </Div>
          )}
        </>
      ) : (
        <h1 className="text-white">No song selected</h1> 
      )}
    </Div>
  );
};

export default PlayDiv;

