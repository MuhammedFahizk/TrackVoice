import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './audioSlice'; // Import your audio slice
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage for web

// Configure persist settings for the audio slice
const persistConfig = {
  key: 'audio', // Key for the persisted slice
  storage, // Storage mechanism (localStorage)
};

// Wrap the audio reducer with persistReducer
const persistedAudioReducer = persistReducer(persistConfig, audioReducer);

// Configure the store with slices and middleware
const store = configureStore({
  reducer: {
    audio: persistedAudioReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor for the store
export const persistor = persistStore(store);

export default store;
