import React, { useEffect, useState, useRef } from 'react';
import Div from '../components/Div';
import { Input, message } from 'antd'; // Ant Design components
import { fetchFriends } from '../api/getApi';
import Friend from '../Specific.jsx/Freind';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Friends = () => {
  const [friends, setFriends] = useState([]); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  
  const scrollContainerRef = useRef(null); // Create a reference for the scroll container
  const [showScrollRight, setShowScrollRight] = useState(true); // State to control the right scroll message visibility
  const [showScrollLeft, setShowScrollLeft] = useState(false); // State to control the left scroll message visibility
  
  // Load friends on component mount
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const friendsData = await fetchFriends(); // Fetch friends data initially
        setFriends(friendsData.friends);
        setUsers(friendsData.allUsers);
      } catch (err) {
        console.error('Error fetching friends:', err);
        setError(err.message); 
        message.error('Failed to fetch friends.'); 
      } finally {
        setLoading(false);
      }
    };
    loadFriends(); 
  }, []); 

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Update search term state

    if (term) {
      try {
        const friendsData = await fetchFriends(term); // Fetch friends based on search term
        setFriends(friendsData); // Update state with filtered friends data
      } catch (err) {
        console.error('Error fetching friends:', err);
        setError(err.message); // Set error message if fetching fails
        message.error('Failed to fetch friends.'); // Optional: Display error message
      }
    } else {
      // If search term is empty, fetch all friends again
      loadFriends();
    }
  };

  // Handle scroll events to toggle the visibility of scroll messages
  const handleScroll = () => {
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

    // Show/hide the scroll messages based on scroll position
    setShowScrollRight(scrollLeft < maxScrollLeft - 10); // Slight offset to prevent the message from disappearing too soon
    setShowScrollLeft(scrollLeft > 10); // Show "Scroll left" if scrolled beyond a small threshold
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <p className="text-white">Loading friends...</p>; // Show loading text
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }

  return (
    <Div className="friends-list w-full relative">
      <Input
        className='w-[400px] ms-auto mb-4' 
        placeholder="Search friends..."
        value={searchTerm}
        onChange={handleSearchChange} 
      />

      {/* Main container for horizontal scrolling */}
      <Div ref={scrollContainerRef} className={'flex relative overflow-x-auto w-full no-scrollbar'}>
        
        {friends.length > 0 ? (
          <Div className={'px-3 flex-shrink-0 w-1/2 h-[500px] overflow-y-auto'}>
            <h1 className='text-3xl text-white'>Friends List</h1>
            
            {friends.map((friend, index) => (
              <Friend key={index} initialIsFriend={true} friend={friend} />
            ))}
          </Div>
        ) : (
          <p className="text-white">No friends found.</p>
        )}

        {users.length > 0 ? (
          <Div className={'px-3 flex-shrink-0 w-1/2 h-[500px] overflow-y-auto no-scrollbar'}>
            <h1 className='text-3xl text-white'>Users List</h1>
            {users.map((friend, index) => (
              <Friend key={index} initialIsFriend={friends.some(item => item._id === friend._id)} friend={friend} />
            ))}
          </Div>
        ) : (
          <p className="text-white">No users found.</p>
        )}

        {/* Example for another section */}
        <Div className={'px-3 flex-shrink-0 w-1/2 h-[500px] bg-red-800 overflow-y-auto no-scrollbar'}>
          {/* You can place other elements or components here */}
        </Div>
      </Div>

      {/* Scroll message icons (conditionally shown) */}
      {showScrollRight && (
        <p className='text-white z-50 top-0 right-2 absolute mb-2 flex h-fit p-2 rounded-md items-center shadow-2xl bg-bgSecondary'>
          Scroll right <MdKeyboardDoubleArrowRight />
        </p>
      )}

      {showScrollLeft && (
        <p className='text-white z-50 top-48 left-0 absolute mb-2 flex h-fit p-2 rounded-md items-center shadow-2xl bg-bgSecondary'>
          <MdKeyboardDoubleArrowLeft /> Scroll left
        </p>
      )}
    </Div>
  );
};

export default Friends;
