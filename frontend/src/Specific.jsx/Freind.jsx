import React, { useState } from 'react';
import Div from '../components/Div';
import { FiUser } from "react-icons/fi";
import { FaMinus, FaPlus, FaCaretDown } from 'react-icons/fa';
import { addToFriend, removeToFriend } from '../api/PostAppi';

const Friend = ({ friend, initialIsFriend }) => {
  const [isFriend, setIsFriend] = useState(initialIsFriend);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  const handleAddFriend = async () => {
    try {
      await addToFriend(friend._id); // Call the addToFriend function with friend's ID
      setIsFriend(true); // Update state to indicate that the user is now a friend
      console.log(`${friend.name} added as a friend!`); // Optionally display a message
    } catch (error) {
      console.error('Error adding friend:', error);
      // Optionally, display an error message
    } finally {
      setDropdownVisible(false); // Close dropdown after action
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeToFriend(friend._id); // Call the removeToFriend function with friend's ID
      setIsFriend(false); // Update state to indicate that the user is no longer a friend
      console.log(`${friend.name} removed from friends!`); // Optionally display a message
    } catch (error) {
      console.error('Error removing friend:', error);
      // Optionally, display an error message
    } finally {
      setDropdownVisible(false); // Close dropdown after action
    }
  };

  return (
    <Div className='flex gap-2 bg-bg my-2 rounded-lg h-fit p-2 items-center text-white relative'>
      <FiUser className='text-4xl' />
      <Div className='flex flex-col gap-0'>
        <h1 className='text-xl font-mono'>{friend.name}</h1>
        <h1 className='text-md text-bgblack font-mono'>{friend.email}</h1>
      </Div>
      <Div
        className='ms-auto flex h-full items-center gap-2 bg-primary p-3 rounded-lg cursor-pointer relative'
        onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
      >
        <h3>{isFriend ? 'Friend' : 'Not a Friend'}</h3>
        <FaCaretDown />
      </Div>

      {dropdownVisible && (
       <Div className='absolute right-0 top-10 z-50 bg-bgblack rounded-lg shadow-lg mt-2 p-2'>
       {isFriend ? (
        
         <Div className='flex flex-col gap-2'>
          <Div
           className='flex items-center gap-2 cursor-pointer text-red-500'
           onClick={handleRemoveFriend}
         >
           <FaMinus />
           <span>Remove Friend</span>
         </Div>
         <Div
           className='flex items-center gap-2 cursor-pointer text-blue-500'
           // Add your send message handler here
           onClick={() => console.log(`Send message to ${friend.name}`)}
         >
           <FaPlus />
           <span>Send Message</span>
         </Div>
       </Div>
       ) : (
         <Div className='flex flex-col gap-2'>
           <Div
             className='flex items-center gap-2 cursor-pointer text-green-500'
             onClick={handleAddFriend}
           >
             <FaPlus />
             <span>Add Friend</span>
           </Div>
           <Div
             className='flex items-center gap-2 cursor-pointer text-blue-500'
             // Add your send message handler here
             onClick={() => console.log(`Send message to ${friend.name}`)}
           >
             <FaPlus />
             <span>Send Message</span>
           </Div>
         </Div>
       )}
       
     </Div>
   )}
 </Div>
     
  );
};

export default Friend;
