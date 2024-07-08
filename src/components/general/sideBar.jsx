// import { Link } from "@chakra-ui/react"
// import { useNavigate } from "react-router-dom";
// import { useState,useEffect } from "react";
// import {jwtDecode} from "jwt-decode";


// const SideBar = () =>{
//     const navigate = useNavigate();
//     const [token, setToken] = useState(null);
//   const [username, setUsername] = useState('');


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

//     const handleProfile = () =>{
//         navigate("/profile")
//     }
//     const handleHome = () =>{
//         navigate("/")
//     }
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         setUsername('');
//         const event = new Event('authChange');
//         window.dispatchEvent(event);
//         navigate('/');
//       };

//     return( <div className="w-1/5 bg-gray-200 h-[100vh] p-4 fixed mt-16">
//     <ul className="space-y-4">
//         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleHome}>Home</li> 
//         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleProfile}>Profile</li>
//         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleLogout}>Logout</li>
//         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleProfile}>Settings</li>
//     </ul>
// </div>
// )
// }
// export default SideBar







import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SideBar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

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

  const handleProfile = () => {
    navigate("/profile");
  };

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
    <div className="w-1/5 bg-gray-200 h-[100vh] p-4 fixed mt-16">
      <ul className="space-y-4">
        <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleHome}>Home</li>
        <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleProfile}>Profile</li>
        <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleNotifications}>Notifications</li>
        <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleLogout}>Logout</li>
        <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md" onClick={handleProfile}>Settings</li>
      </ul>
    </div>
  );
};

export default SideBar;
