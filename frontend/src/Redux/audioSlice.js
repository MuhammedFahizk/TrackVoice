import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  currentSong: null,
  queue: [], 
  likedIds: [],
  prevPlayLists:[],
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
  console.log(action.payload);
  
  // Flatten the queue to avoid having different structures (some items with 'track' and some without)
  state.queue = action.payload.map(item => item.track || item);
  
  // Set the current song to the first one
  state.currentSong = state.queue[0];
},
addPrevPlayLists: (state, action) => {
  const { payload: newPlaylistId } = action;

  if (!state.prevPlayLists.includes(newPlaylistId)) {
    state.prevPlayLists.push(newPlaylistId); 
  }
},
removePrevPlayList: (state, action) => {
  const { payload: playlistId } = action;
  state.prevPlayLists = state.prevPlayLists.filter(id => id !== playlistId);
},

nextSong: (state) => {
  if (state.queue.length > 0) {
    const id = state.currentSong.id;
    const index = state.queue.findIndex(song => song.id === id);
    
    if (index !== -1 && index < state.queue.length - 1) {
      state.currentSong = state.queue[index + 1];
    } else {
      // If no next song, reset currentSong
      state.currentSong = null;
    }
  }
},

previousSong: (state) => {
  if (state.queue.length > 0) {
    const id = state.currentSong.id;
    // Find the index of the current song in the queue
    const index = state.queue.findIndex(song => song.id === id);
    
    if (index > 0) {
      // Move to the previous song in the queue
      state.currentSong = state.queue[index - 1];
    } else {
      // If no previous song, reset currentSong
      state.currentSong = null;
    }
  }
},

    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter(song => song.trackId !== action.payload);
    },

    addLike: (state, action) => {
      const  trackId  = action.payload;
      // Add the track ID to the likedIds array if it doesn't already exist
      if (!state.likedIds.includes(trackId)) {
        state.likedIds.push(trackId);
      }
    },
    removeLike: (state, action) => {
      const  trackId  = action.payload;
      // Remove the track ID from the likedIds array
      state.likedIds = state.likedIds.filter(id => id !== trackId);
    },
    setLikes: (state, action) => {
      
      state.likedIds = action.payload; // Set the entire array of liked IDs
    },
  },

});

export const {addPrevPlayLists,removePrevPlayList, setLikes,addLike, removeLike, setCurrentSong,nextSong,previousSong, playSong, pauseSong, updateProgress, addToQueue, removeFromQueue } = audioSlice.actions;

export default audioSlice.reducer;
