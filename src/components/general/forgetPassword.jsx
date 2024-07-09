import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [updatedpassword, setUpdatedPassword] = useState('');
  const [loadingForgot, setLoadingForgot] = useState(false);
  const toast = useToast();

  const handleUpdatePassword = async () => {
    setLoadingForgot(true);

    if (!email || !updatedpassword) {
      toast({
        title: "Please fill all the fields",
        status: 'warning',
        duration: 500,
        isClosable: true,
        position: 'top',
      });
      setLoadingForgot(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put('https://liaison-main-4u51.onrender.com/api/user/forgotpassword', {
        email,
        updatedpassword
      }, config);

      toast({
        title: "Password Updated Successfully",
        status: 'success',
        duration: 500,
        isClosable: true,
        position: 'top',
      });

      setLoadingForgot(false);
      onClose(); // Close the modal after successful password update
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Error Occurred!",
        status: 'error',
        duration: 500,
        isClosable: true,
        position: 'top',
      });
      setLoadingForgot(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="updatedpassword" className="block mb-1">New Password</label>
          <input
            type="password"
            id="updatedpassword"
            value={updatedpassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleUpdatePassword}
            className="w-24 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={loadingForgot}
          >
            {loadingForgot ? 'Updating...' : 'Update'}
          </button>
          <button
            onClick={onClose}
            className="w-24 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;
