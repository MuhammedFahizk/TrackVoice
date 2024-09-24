import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, notification } from 'antd'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import icons from react-icons
import Div from '../components/Div';
import { signupUser } from '../api/PostAppi';
import useAuthenticated from '../Utils/useAuthenticated'; // Adjust the import path as needed

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthenticated();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/'); // Redirect to home if already authenticated
    }
  }, [isAuthenticated, loading, navigate]);

  const onSubmit = async (data) => {
    try {
      await signupUser(data); 
      notification.success({
        message: 'Signup Successful',
        description: 'You have successfully signed up!',
      });
      navigate('/'); 
    } catch (error) {
      notification.error({
        message: 'Signup Failed',
        description: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Div className={'bg-primary p-10 w-[370px] border rounded-lg'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              className="p-2 border rounded-md"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

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
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              })}
              className="p-2 border rounded-md pr-10" // Add padding to right for the icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />} {/* Use React Icons */}
            </button>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="flex flex-col relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => {
                  const { password } = getValues();
                  return value === password || 'Passwords do not match';
                },
              })}
              className="p-2 border rounded-md pr-10" // Add padding to right for the icon
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />} {/* Use React Icons */}
            </button>
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <Button
            htmlType="submit"
            style={{ backgroundColor: '#EC0000', borderColor: '#220A0A' }}
            className="w-full text-white h-10"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-white">Already have an account? </span>
          <Link to="/login" className="text-black font-bold">Login here</Link>
        </div>
      </Div>
    </div>
  );
};

export default SignUp;
