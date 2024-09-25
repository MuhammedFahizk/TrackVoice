import User from "../models/User.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getFriends = async (req, res) => {
    const { id } = req.user; 

    try {
        // Fetch the user and populate friends to get their details
        const user = await User.findById(id)
            .select('friends') // Select only the friends field
            .populate('friends', 'name email'); // Populate friends with name and email

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friendsList = user.friends; // This will contain populated friend details

        const allUsers = await User.find({ _id: { $ne: id } }).select('name email _id');

        return res.status(200).json({ friends: friendsList, allUsers }); 
    } catch (error) {
        console.error("Error fetching friends by ID:", error);
        return res.status(500).json({ message: "Error fetching friends" });
    }
};




export const addFriend = async (req, res) => {
    const { id } = req.user; // Get the current user's ID from the request
    const { friendId } = req.body; // Get the friend's ID from the request body

    if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
    }

    try {
        // Find the current user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'You are already friends with this user.' });
        }

        user.friends.push(friendId);

        await user.save();

        const friend = await User.findById(friendId);
        if (friend) {
            friend.friends.push(id);
            await friend.save(); 
        }

        return res.status(200).json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error("Error adding friend:", error);
        return res.status(500).json({ message: "Error adding friend" });
    }
};





export const removeFriend = async (req, res) => {
    const { id } = req.user; // Current user's ID
    const { friendId } = req.body; // Friend's ID to be removed

    console.log('Removing friend:', friendId, 'for user:', id);

    if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
    }

    // Validate friendId
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: 'Invalid Friend ID' });
    }

    try {
        // Find the current user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert friendId to ObjectId for comparison
        const friendObjectId = new ObjectId(friendId);

        // Check if the friendId exists in the user's friends list
        if (!user.friends.includes(friendObjectId)) {
            return res.status(400).json({ message: 'You are not friends with this user.' });
        }

        // Remove the friend's ID from the user's friends list
        user.friends = user.friends.filter(friend => !friend.equals(friendObjectId));
        await user.save();

        // Find the friend user and remove the current user's ID from their friends list
        const friend = await User.findById(friendId);
        if (friend) {
            // Convert current user's ID to ObjectId for comparison
            const userObjectId = new ObjectId(id);
            friend.friends = friend.friends.filter(friend => !friend.equals(userObjectId));
            await friend.save();
        }

        // Debugging logs
        console.log('Updated User Friends:', user.friends);
        if (friend) {
            console.log('Updated Friend Friends:', friend.friends);
        }

        return res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error("Error removing friend:", error);
        return res.status(500).json({ message: "Error removing friend" });
    }
};

