import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { verifyUser } from '../api/getApi';
import Home from '../pages/Home';

const ProtectedRouteUser = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser()
        console.log('Verification response:', res);
      } catch (error) {
        console.error('Error verifying user:', error);
        console.error('Verification error:', error);
        console.log('Redirecting to login due to error');
        // toast.error(error.error.message)

        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate, location.pathname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <Home />
    
  );
};

export default ProtectedRouteUser;
