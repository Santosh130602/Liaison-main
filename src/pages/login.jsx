import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import logsig from "../assets/siglogin.png";
import PasswordResetModal from '../components/general/forgetPassword';
// import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://liaison-main-4oyd.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        navigate('/home');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-12">
      <div className='w-60%'>
        <img src={logsig} alt='logsig' />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <p
              className='w-fit ml-[250px] text-blue-500 cursor-pointer scroll-mt-4 underline hover:text-sky-900'
              onClick={() => setIsModalOpen(true)} // Open the modal
            >
              Forget password?
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-around gap-8">
          <button
            onClick={handleFacebookLogin}
            className="w-full flex gap-4 items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
          >
            <FaFacebook /> Facebook
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex gap-4 items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none focus:bg-red-800"
          >
            <FaGoogle /> Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
      {isModalOpen && <PasswordResetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Login;
