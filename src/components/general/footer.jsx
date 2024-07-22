
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrected import
import { IoSettingsOutline, IoHome, IoNotifications, IoPersonAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { MdOutlineMessage } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

const Footer = () => {
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
    navigate("/notifications"); 
  };

  return (
   

    <div className="footer h-16 bg-zinc-900 fixed bottom-0 hidden w-full items-center">
        <div className="flex justify-around pt-3">
            <div className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleHome}><IoHome className="text-2xl"/></div>
            <div className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleAddPost}><BiImageAdd className="text-2xl"/></div>
            <div className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center gap-4 text-left" onClick={handleProfile}><CgProfile className="text-2xl"/></div>
        </div>
    </div>
  );
};

export default Footer;
