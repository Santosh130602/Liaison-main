
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrected import
import { IoSettingsOutline, IoHome, IoNotifications, IoPersonAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { MdOutlineMessage } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

const SmallSideBar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setToken(token); 
      } catch (error) {
        console.error('Invalid token', error);
      }
    }

    const handleAuthChange = () => {
      const newToken = localStorage.getItem('token');
      if (newToken) {
        try {
          const decodedToken = jwtDecode(newToken);
          setUsername(decodedToken.username);
          setToken(newToken);
        } catch (error) {
          console.error('Invalid token', error);
        }
      } else {
        setUsername('');
        setToken(null);
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleSearch = () =>{
    navigate("/search");
  }

  const handleMessage = () =>{
    navigate("/message");
  }

  const handleHome = () => {
    navigate("/");
  };
  const handleAddPost = () =>{
    navigate("/addpost");
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername('');
    const event = new Event('authChange');
    window.dispatchEvent(event);
    navigate('/');
  };

  const handleNotifications = () => {
    navigate("/notifications"); // Navigate to notifications page
  };

  return (
    <div className="w-1/16 bg-zinc-900 h-[100vh] p-4 fixed mt-16 flex flex-col justify-between">
      <div>
        <ul className="space-y-4">
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleHome}> <IoHome className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleProfile}>  <CgProfile className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleAddPost}>  <BiImageAdd className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleNotifications}><IoNotifications className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleSearch}>  <IoPersonAdd className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleMessage}>  <MdOutlineMessage className="text-2xl"/></li>
          <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleLogout}> <TbLogout className="text-2xl"/> </li>
        </ul>
      </div>
      <div className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-2 text-left mt-auto mb-16" onClick={handleProfile}> <IoSettingsOutline className="text-2xl"/></div>
    </div>
  );
};

export default SmallSideBar;
