import React, { useState } from 'react';
import { FcAddImage } from "react-icons/fc";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import Header from '../components/common/Header'

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('token');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    uploadImageToCloudinary(file);
  };

  const uploadImageToCloudinary = (file) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "liaison");
    data.append("cloud_name", "dh5s1wktp");

    fetch("https://api.cloudinary.com/v1_1/dh5s1wktp/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const submitHandler = async () => {
    if (!pic || !caption) {
      toast({
        title: "Please upload an image and enter a caption!",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(`http://localhost:4000/api/posts/addPost`, { post: pic, caption }, config);
      toast({
        title: "Post added Successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      setSelectedImage(null);
      setPic('');
      setCaption('');
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }
  };

  const discardHandler = () => {
    setSelectedImage(null);
    setCaption('');
    setPic('');
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <div className="mb-4">
        <label htmlFor="file-upload" className="block mb-2 cursor-pointer text-center">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded" />
          ) : (
            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded cursor-pointer">
              <FcAddImage className="text-6xl" />
            </div>
          )}
          <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleFileInputChange} />
        </label>
      </div>
      <textarea
        placeholder="Enter caption here..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded resize-none"
        rows="4"
      />
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={discardHandler}
        >
          Discard
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {loading && <div className="mt-4 text-center">Loading...</div>}
    </div>
  );
};

export default AddPost;
