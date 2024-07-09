
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import {jwtDecode} from "jwt-decode"; // Fixed import statement
// import { FiHome } from "react-icons/fi";
// import { IoLogOutOutline } from "react-icons/io5";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { MdArrowDropUp } from "react-icons/md";
// import { IoHome } from "react-icons/io5";
// import { TbLogout } from "react-icons/tb";
// import { IoNotifications } from "react-icons/io5";
// import { IoNotificationsOutline } from "react-icons/io5";
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

// const Header = () => {
//   const [token, setToken] = useState(null);
//   const [username, setUsername] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notificationcount, setNotificationCount] = useState();
//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUsername(decodedToken.username); // Assuming the token has a 'username' field
//         setToken(token); // Set token state if it's valid
//       } catch (error) {
//         console.error('Invalid token', error);
//       }
//     }
//     const config = {
//       headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-type': 'application/json',
//       },
//   };

 
//     const handleAuthChange = () => {
//       const newToken = localStorage.getItem('token');
//       if (newToken) {
//         try {
//           const decodedToken = jwtDecode(newToken);
//           setUsername(decodedToken.username);
//           setToken(newToken);
//         } catch (error) {
//           console.error('Invalid token', error);
//         }
//       } else {
//         setUsername('');
//         setToken(null);
//       }
//     };

//     window.addEventListener('authChange', handleAuthChange);

//     return () => {
//       window.removeEventListener('authChange', handleAuthChange);
//     };
//   }, []);


//   const fetchNotification = async () =>{
//     try{
//       const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-type': 'application/json',
//         }

//       const response = await axios.get('http://localhost:4000/api/notifications/count', config);
//       setNotificationCount(response.data.count);
//     }catch(error){
//       toast({
//         title: error.response?.data?.message || 'Error Occurred!',
//        status: 'error',
//       duration: 5000,
//       isClosable: true,
//       position: 'top',
//        });
//     }
//   }






//   const generateUserImgUrl = (firstName) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleSignup = () => {
//     navigate('/signup');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUsername('');
//     const event = new Event('authChange');
//     window.dispatchEvent(event);
//     navigate('/');
//   };
//   const handleNotification = () =>{
//     navigate('/notifications');
//   }

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleHome = () => {
//     navigate('/');
//   };
  
//   const handleAddPost = () => {
//     navigate('/addpost');
//   }

//   return (
//     <div className="w-full bg-zinc-900 text-slate-300 flex justify-center fixed">
//       <div className="w-10/12 flex justify-around items-center">
//         <div>
//           <Link to="/"><img src={logo} className="h-16 w-18" alt="Logo" /></Link>
//         </div>
//         <div className="flex gap-16 text-xl">
//           <p>About</p>
//           <p>Contact</p>
//         </div>
//         <div className="flex gap-8 relative">
//           {token ? (
            
            
//             <div className="flex items-center">
//               <div className="mr-28" onClick={handleNotification}>
//                 <IoNotificationsOutline className="text-2xl " />{notificationcount}
//                  </div>
                
//                <button
//                 className="w-12 h-9 left-2 rounded-full text-dark-200 flex items-center justify-center gap-4"
//                 onClick={toggleDropdown}
//               >
                
//                 <p className="text-xl"><strong>{username}</strong></p>
//                 <img src={generateUserImgUrl(username)} alt="User" className="user-img h-75 rounded-full" style={{ marginRight: "5px" }} />
                
//               </button>
//               {dropdownOpen && (
//                 <>
//                 {/* <MdOutlineArrowDropDown className="text-xl"/> */}
//                 <div className="absolute top-16 left-1 right-0 bg-zinc-900 w-[200px] shadow-md rounded p-2">
//                 <MdArrowDropUp className="text-7xl mt-[-50px] text-zinc-900"/>
//                   <button onClick={handleHome} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3  font-medium">
//                     <IoHome className="text-xl"  /> Home
//                   </button>
//                   <hr />
//                   <button onClick={handleAddPost} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3  font-medium">
//                     <CgProfile className="text-xl"  /> Profile
//                   </button>
//                   <hr />
//                   <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3  font-medium">
//                     <TbLogout className="text-xl"  /> Logout
//                   </button>
//                 </div>
//                 </>
//               )}
//             </div>
//           ) : (
//             <>
//               <button
//                 onClick={handleLogin}
//                 className="bg-zinc-950 w-20 h-9 rounded text-sky-200"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={handleSignup}
//                 className="bg-zinc-950 w-20 h-9 rounded text-sky-200"
//               >
//                 Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


















import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {jwtDecode} from "jwt-decode"; // Fixed import statement
import { FiHome } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const Header = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Initialize with 0
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // Assuming the token has a 'username' field
        setToken(token); // Set token state if it's valid
        fetchNotification(token); // Fetch notifications after setting the token
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
          fetchNotification(newToken); // Fetch notifications after setting the new token
        } catch (error) {
          console.error('Invalid token', error);
        }
      } else {
        setUsername('');
        setToken(null);
        setNotificationCount(0); // Reset notification count when logged out
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const fetchNotification = async (token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      };

      const response = await axios.get('https://liaison-main-4u51.onrender.com/api/notifications/count', config);
      setNotificationCount(response.data.count);
    } catch (error) {
      toast({
        title: error.response?.data?.message || 'Error Occurred!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const generateUserImgUrl = (firstName) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername('');
    setNotificationCount(0); // Reset notification count on logout
    const event = new Event('authChange');
    window.dispatchEvent(event);
    navigate('/');
  };

  const handleNotification = () => {
    navigate('/notifications');
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHome = () => {
    navigate('/');
  };
  
  const handleAddPost = () => {
    navigate('/addpost');
  }

  return (
    <div className="w-full bg-zinc-900 text-slate-300 flex justify-center fixed">
      <div className="w-10/12 flex justify-around items-center">
        <div>
          <Link to="/"><img src={logo} className="h-16 w-36" alt="Logo" /></Link>
        </div>
        <div className="flex gap-16 text-xl">
          <p>About</p>
          <p>Contact</p>
        </div>
        <div className="flex gap-8 relative">
          {token ? (
            <div className="flex items-center">
              <div className="mr-28 relative" onClick={handleNotification}>
                <IoNotificationsOutline className="text-2xl" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notificationCount}
                  </span>
                )}
              </div>
              <button
                className="w-12 h-9 left-2 rounded-full text-dark-200 flex items-center justify-center gap-4"
                onClick={toggleDropdown}
              >
                <p className="text-xl"><strong>{username}</strong></p>
                <img src={generateUserImgUrl(username)} alt="User" className="user-img h-75 rounded-full" style={{ marginRight: "5px" }} />
              </button>
              {dropdownOpen && (
                <>
                  <div className="absolute top-16 left-1 right-0 bg-zinc-900 w-[200px] shadow-md rounded p-2">
                    <MdArrowDropUp className="text-7xl mt-[-50px] text-zinc-900" />
                    <button onClick={handleHome} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3 font-medium">
                      <IoHome className="text-xl" /> Home
                    </button>
                    <hr />
                    <button onClick={handleAddPost} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3 font-medium">
                      <CgProfile className="text-xl" /> Profile
                    </button>
                    <hr />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 flex items-center gap-3 font-medium">
                      <TbLogout className="text-xl" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="bg-zinc-950 w-20 h-9 rounded text-sky-200"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-zinc-950 w-20 h-9 rounded text-sky-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
