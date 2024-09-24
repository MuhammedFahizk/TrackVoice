import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../api/getApi'; // Adjust the import path

const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser();
        setIsAuthenticated(true); // Adjust based on your API response
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated, loading };
};

export default useAuthenticated;
