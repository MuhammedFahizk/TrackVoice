import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyUser } from '../api/getApi';
import Home from '../pages/Home';
import { useDispatch } from 'react-redux';
import { message } from 'antd'; // Ant Design notification component
import { setLikes } from '../Redux/audioSlice';

const ProtectedRouteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser();
        
        // Assuming `res.likes` contains an array of liked song IDs
        dispatch(setLikes(res.likes)); // Dispatch the liked songs to the Redux store
        console.log('Verification response:', res.likes);
      } catch (error) {
        console.error('Error verifying user:', error);
        message.error('Verification failed. Redirecting to login...'); // Ant Design notification
        console.log('Redirecting to login due to error');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [dispatch, navigate]); // Removed `location.pathname` to avoid unnecessary re-renders

  if (loading) {
    return <p>Loading...</p>; // You can customize this loading message
  }

  return (
    <>
      <Home /> 
    </>
  );
};

export default ProtectedRouteUser;
