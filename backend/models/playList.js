import mongoose from 'mongoose'; // Import mongoose using ES module syntax
const { Schema } = mongoose;

// Define the Playlist schema
const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  songs: [
    {
      type: String
    },
  ],
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-set the creation date
  },
});

// Create and export the Playlist model
const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist; // Use default export
