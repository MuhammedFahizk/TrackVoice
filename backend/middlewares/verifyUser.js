import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the import based on your project structure
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '../utils/tokenManager.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Middleware to verify user
export const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken; // Assuming you store the access token in cookies
  const refreshToken = req.cookies.refreshToken; // Assuming you store the refresh token in cookies

  if (accessToken) {
    try {
      const decodedUser = verifyAccessToken(accessToken);
      req.user = decodedUser; // Attach user info to request\
      console.log('hai');
      
      return next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Access token verification failed:', error);
    }
  }

  // If there's no access token or it's invalid, check the refresh token
  if (refreshToken) {
    try {
      const decodedUser = verifyRefreshToken(refreshToken);
      const user = await User.findById(decodedUser.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken(user);
      
      // Set the new access token in cookies
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure flag for production
        maxAge: 15 * 60 * 1000, 
        sameSite: 'Strict',

      });

      req.user = decodedUser; // Attach user info to request
      return next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Refresh token verification failed:', error);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  }

  return res.status(403).json({ message: 'No tokens provided' });
};
