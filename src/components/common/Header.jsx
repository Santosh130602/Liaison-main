
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {jwtDecode} from "jwt-decode"; // Fixed import statement
import { FiHome } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";

const Header = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // Assuming the token has a 'username' field
        setToken(token); // Set token state if it's valid
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
    const event = new Event('authChange');
    window.dispatchEvent(event);
    navigate('/');
  };

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
    <div className="w-full bg-gray-200 flex justify-center fixed">
      <div className="w-10/12 flex justify-around items-center">
        <div>
          <Link to="/"><img src={logo} className="h-16 w-18" alt="Logo" /></Link>
        </div>
        <div className="flex gap-16 text-xl">
          <p>About</p>
          <p>Contact</p>
        </div>
        <div className="flex gap-8 relative">
          {token ? (
            <div>
              <button
                className="w-12 h-9 rounded-full text-dark-200 flex items-center justify-center gap-4"
                onClick={toggleDropdown}
              >
                <p className="text-xl"><strong>{username}</strong></p>
                <img src={generateUserImgUrl(username)} alt="User" className="user-img h-75 rounded-full" style={{ marginRight: "5px" }} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded p-2">
                  <button onClick={handleHome} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
                    <FiHome /> Home
                  </button>
                  <hr />
                  <button onClick={handleAddPost} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
                    <MdOutlineAddAPhoto style={{ fontWeight: "bolder" }} /> Add Post
                  </button>
                  <hr />
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
                    <IoLogOutOutline style={{ fontWeight: "bolder" }} /> Logout
                  </button>
                </div>
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


































// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import {jwtDecode} from "jwt-decode"; // Fixed import statement
// import { FiHome } from "react-icons/fi";
// import { IoLogOutOutline } from "react-icons/io5";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import { useToast } from '@chakra-ui/react';

// const Header = () => {
//   const [token, setToken] = useState(null);
//   const [username, setUsername] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [educationLevel, setEducationLevel] = useState('');
//   const [suggestions, setSuggestions] = useState({ usernames: [], schools: [], states: [], districts: [] });
//   const toast = useToast();
//   const navigate = useNavigate();

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

//     const fetchSuggestions = async (type, value) => {
//       try {
//           const response = await axios.get(`http://localhost:4000/api/usersearch/suggestions/${type}?query=${value}&educationType=${educationLevel}`, config);
//           setSuggestions(prev => ({ ...prev, [type]: response.data }));
//       } catch (error) {
//           toast({
//               title: error.response?.data?.message || 'Error Occurred!',
//               status: 'error',
//               duration: 5000,
//               isClosable: true,
//               position: 'top',
//           });
//       }
//   };


//   const handleSearch = async () => {
//     try {
//         const response = await axios.get('http://localhost:4000/api/usersearch/usersearch', {
//             params: { username, educationLevel, school, passingYear, state, district },
//             ...config
//         });
//         setSearchResults(response.data);
//     } catch (error) {
//         toast({
//             title: error.response?.data?.message || 'Error Occurred!',
//             status: 'error',
//             duration: 5000,
//             isClosable: true,
//             position: 'top',
//         });
//     }
// };


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
//     <div className="w-full bg-gray-200 flex justify-center fixed">
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
//             <div>
//               <button
//                 className="w-12 h-9 rounded-full text-dark-200 flex items-center justify-center gap-4"
//                 onClick={toggleDropdown}
//               >
//                 <p className="text-xl"><strong>{username}</strong></p>
//                 <img src={generateUserImgUrl(username)} alt="User" className="user-img h-75 rounded-full" style={{ marginRight: "5px" }} />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute top-12 right-0 bg-white shadow-md rounded p-2">
//                   <button onClick={handleHome} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
//                     <FiHome /> Home
//                   </button>
//                   <hr />
//                   <button onClick={handleAddPost} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
//                     <MdOutlineAddAPhoto style={{ fontWeight: "bolder" }} /> Add Post
//                   </button>
//                   <hr />
//                   <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-lg font-medium">
//                     <IoLogOutOutline style={{ fontWeight: "bolder" }} /> Logout
//                   </button>
//                 </div>
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



