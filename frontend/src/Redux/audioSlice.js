import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  currentSong: null,
  queue: [], // List of upcoming songs
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
        console.log(action.payload);
        
      state.currentSong = action.payload;
      state.queue = state.queue.filter(song => song.trackId !== action.payload.trackId);
    },
    playSong: (state) => {
      state.currentSong.isPlaying = true;
    },
    pauseSong: (state) => {
      state.currentSong.isPlaying = false;
    },
    updateProgress: (state, action) => {
      state.currentSong.progress = action.payload;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter(song => song.trackId !== action.payload);
    },
  },
});

export const { setCurrentSong, playSong, pauseSong, updateProgress, addToQueue, removeFromQueue } = audioSlice.actions;

export default audioSlice.reducer;
