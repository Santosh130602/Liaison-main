




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { IoPersonAdd } from "react-icons/io5";

const SideBar = () => {
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

  const handleHome = () => {
    navigate("/");
  };

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
    <div className="w-1/6 bg-zinc-900 h-[100vh] p-4 fixed mt-16">
      <ul className="space-y-4">
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left " onClick={handleHome}> <IoHome className="text-lg"/>Home</li>
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left" onClick={handleProfile}> <CgProfile className="text-lg"/>Profile</li>
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left" onClick={handleNotifications}> <IoNotifications className="text-lg"/>Notifications</li>
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left" onClick={handleSearch}> <IoPersonAdd className="text-lg"/>add Friend</li>
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left" onClick={handleLogout}><TbLogout className="text-lg"/>Logout</li>
        <li className="flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-2 py-1 rounded-md items-center  gap-2 text-left " onClick={handleProfile}> <IoSettingsOutline className="text-lg"/>Settings</li>
      </ul>
    </div>
  );
};

export default SideBar;
