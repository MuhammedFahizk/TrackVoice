import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Div from '../components/Div';
import { loginUser } from '../api/PostAppi';
import useAuthenticated from '../Utils/useAuthenticated'; // Adjust the import path

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthenticated();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openNotification = (message, type) => {
    notification[type]({
      message: message,
      placement: 'top',
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      openNotification('Login successful!', 'success');
      navigate('/'); // Redirect to home on successful login
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      openNotification(errorMessage, 'error');
    }
  };

  if (loading) return <p>Loading...</p>; // Optional loading state
  if (isAuthenticated) {
    navigate('/'); 
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Div className={'bg-primary p-10 w-[370px] border rounded-lg'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
              className="p-2 border rounded-md"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className="p-2 border rounded-md"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <Button
            htmlType="submit"
            style={{ backgroundColor: '#EC0000', borderColor: '#220A0A' }}
            className="w-full text-white h-10"
          >
            Login
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <span className="text-white">Don't have an account? </span>
          <Link to="/signUp" className="text-black font-bold">
            Sign Up
          </Link>
        </div>
      </Div>
    </div>
  );
};

export default Login;
