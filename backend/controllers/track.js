import User from '../models/User.js';

export const likeTrack = async (req, res) => {
    console.log('liking');
    
    const { id } = req.params; // Get the track ID from the URL parameters
    const userId = req.user; // Assuming req.user is now the valid user ID
    console.log('User ID:', userId);
    console.log('Track ID:', id);
  
    // Ensure both userId and id are provided
    if (!userId || !id) {
        return res.status(400).json({ message: 'User ID and Track ID are required.' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId.id,
            { $push: { likes: id } }, // Use $push to add the track ID
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'Track liked successfully.', likes: user.likes });
    } catch (error) {
        console.error('Error liking track:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

export const unlikeTrack = async (req, res) => {
    const { id } = req.params; // Get the track ID from the URL parameters
    const userId = req.user; // Assuming req.user contains the valid user ID

    console.log('User ID:', userId);
    console.log('Track ID:', id);

    // Ensure both userId and id are provided
    if (!userId || !id) {
        return res.status(400).json({ message: 'User ID and Track ID are required.' });
    }

    try {
        // Use $pull to remove the track ID from the user's liked tracks
        const user = await User.findByIdAndUpdate(
            userId.id,
            { $pull: { likes: id } }, // Remove the track ID from the likes array
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'Track unliked successfully.', likes: user.likes });
    } catch (error) {
        console.error('Error unliking track:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};