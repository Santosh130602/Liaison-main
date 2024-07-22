

// import React, { useState, useRef, useEffect } from 'react';
// import SimplePeer from 'simple-peer';
// import { FaPhone, FaVideo, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
// import { FaVideoSlash } from 'react-icons/fa6';
// import { FaPhoneVolume } from 'react-icons/fa6';
// import axios from 'axios';
// import { useParams, useNavigate, Navigate,useHistory } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// const UserCommunication = () => {
//   const { friendId, friendName } = useParams();
//   const navigate = useNavigate(); // Access history object from react-router-dom
//   // const history = useHistory();
//   const [userId, setUserId] = useState(null); // State to store userId
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [user, setUser] = useState(null);
//   const [friend, setFriend] = useState(null);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);

//   const myVideo = useRef(null); // Initialize refs with null
//   const friendVideo = useRef(null);
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.userId); // Set userId from decoded token
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId); // Fetch user profile using userId
//     }
//     fetchFriendProfile(friendId);
//   }, [userId, friendId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchUserProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user profile', error);
//     }
//   };

//   const fetchFriendProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
//       setFriend(response.data.user);
//     } catch (error) {
//       console.error('Error fetching friend profile', error);
//     }
//   };

//   const handleAudioCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setStream(stream);
//       initiateCall(false, stream);
//       setIsAudioCallActive(true);
      
//       // Update URL with audio call information
//       navigate(`/communication/${friendId}/${friendName}/audio-call`);
//     } catch (error) {
//       console.error('Error starting audio call', error);
//     }
//   };

//   const handleVideoCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(stream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = stream; // Check if ref is defined before setting properties
//         myVideo.current.play();
//       }
//       initiateCall(true, stream);
//       setIsVideoCallActive(true);

//       // Update URL with video call information
//       navigate(`/communication/${friendId}/${friendName}/video-call`);
//     } catch (error) {
//       console.error('Error starting video call', error);
//     }
//   };

//   const initiateCall = (isVideo, stream) => {
//     const peer = new SimplePeer({
//       initiator: true,
//       trickle: false,
//       stream: stream
//     });

//     peer.on('signal', data => {
//       axios.post('https://your-signaling-server.com/call', { userId, friendId, signalData: data, isVideo })
//         .then(response => {
//           peer.signal(response.data.signalData);
//         }).catch(error => {
//           console.error('Error sending signal data', error);
//         });
//     });

//     peer.on('stream', stream => {
//       if (friendVideo.current) {
//         friendVideo.current.srcObject = stream; // Check if ref is defined before setting properties
//         friendVideo.current.play();
//       }
//     });

//     setPeer(peer);
//   };

//   const handleMessageSend = () => {
//     if (message.trim() !== '') {
//       setMessages([...messages, { sender: userId, text: message }]);
//       setMessage('');
//     }
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleImageSend = () => {
//     // Logic for sending images goes here
//   };

//   const handleEndCall = () => {
//     if (peer) {
//       peer.destroy();
//       setPeer(null);
//     }
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//     }
//     setStream(null);
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);

//     // Navigate back to the default communication page
//     navigate.push(`/communication/${friendId}/${friendName}`);
//   };

//   const generateUserImgUrl = (firstName) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-900 text-white shadow-md min-h-screen">
//       <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//         <div className="flex items-center gap-6">
//           <img src={generateUserImgUrl(friendName)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
//           <p>{friendName}</p>
//         </div>
//         <div className="flex gap-4">
//           <button onClick={handleAudioCall} className="p-2 bg-green-500 rounded-full hover:bg-green-600"><FaPhoneVolume /></button>
//           <button onClick={handleVideoCall} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"><FaVideo /></button>
//         </div>
//         {friend && (
//           <div className="flex items-center">
//             <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friend.firstName}`} alt="Friend Avatar" className="h-16 w-16 rounded-full mr-4" />
//             <h2 className="text-2xl">{friend.firstName} {friend.lastName}</h2>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full bg-gray-800 rounded-md p-2 overflow-y-scroll mb-4" style={{ flexGrow: 1 }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
//             <p className="inline-block bg-gray-700 rounded-md p-2">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messageEndRef} />
//       </div>

//       {isAudioCallActive && (
//         <div className="flex flex-col items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-4 z-50 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Audio Call with {friend?.firstName}</h2>
//           <button onClick={handleEndCall} className="p-2 bg-red-500 rounded-full hover:bg-red-600 absolute top-2 right-2">
//             <FaTimes className="text-white" />
//           </button>
//           {/* Add your audio call UI here */}
//         </div>
//       )}

//       {isVideoCallActive && (
//         <div className="flex flex-col items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-4 z-50 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Video Call with {friend?.firstName}</h2>
//           <div className="flex gap-4">
//             <video ref={myVideo} className="w-64 h-48 bg-gray-800 rounded-md" muted />
//             <video ref={friendVideo} className="w-64 h-48 bg-gray-800 rounded-md" />
//           </div>
//           <button onClick={handleEndCall} className="p-2 px-4 bg-red-500 rounded hover:bg-red-600 top-2 right-2">
//             <div className="flex items-center gap-2">
//               <FaVideoSlash /> End
//             </div>
//             </button>
//         </div>
//       )}
//         <div className="flex w-full gap-2 fixed bottom-0 left-0 bg-gray-900 p-4 z-10">
//     <input
//       type="text"
//       className="flex-grow p-2 bg-gray-800 rounded-md text-white"
//       placeholder="Type your message..."
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
//     />
//     <button onClick={handleMessageSend} className="p-2 bg-green-500 rounded-full hover:bg-green-600">
//       <FaPaperPlane className="text-white" />
//     </button>
//     <button onClick={handleImageSend} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
//       <FaImage className="text-white" />
//     </button>
//   </div>
// </div>
// );
// };

// export default UserCommunication;




// **********************************************************************************************************



// import React, { useState, useRef, useEffect } from 'react';
// import SimplePeer from 'simple-peer';
// import { FaPhone, FaVideo, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
// import { FaVideoSlash } from 'react-icons/fa6';
// import { FaPhoneVolume } from 'react-icons/fa6';
// import axios from 'axios';
// import { useParams, useNavigate, Navigate,useHistory } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// const UserCommunication = () => {
//   const { friendId, friendName } = useParams();
//   const navigate = useNavigate(); // Access history object from react-router-dom
//   // const history = useHistory();
//   const [userId, setUserId] = useState(null); // State to store userId
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [user, setUser] = useState(null);
//   const [friend, setFriend] = useState(null);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);

//   const myVideo = useRef(null); // Initialize refs with null
//   const friendVideo = useRef(null);
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.userId); // Set userId from decoded token
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId); // Fetch user profile using userId
//     }
//     fetchFriendProfile(friendId);
//   }, [userId, friendId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchUserProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user profile', error);
//     }
//   };

//   const fetchFriendProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
//       setFriend(response.data.user);
//     } catch (error) {
//       console.error('Error fetching friend profile', error);
//     }
//   };

//   const handleAudioCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setStream(stream);
//       initiateCall(false, stream);
//       setIsAudioCallActive(true);
      
//       // Update URL with audio call information
//       navigate(`/communication/${friendId}/${friendName}/audio-call`);
//     } catch (error) {
//       console.error('Error starting audio call', error);
//     }
//   };

//   const handleVideoCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(stream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = stream; // Check if ref is defined before setting properties
//         myVideo.current.play();
//       }
//       initiateCall(true, stream);
//       setIsVideoCallActive(true);

//       // Update URL with video call information
//       navigate(`/communication/${friendId}/${friendName}/video-call`);
//     } catch (error) {
//       console.error('Error starting video call', error);
//     }
//   };

//   const initiateCall = (isVideo, stream) => {
//     const peer = new SimplePeer({
//       initiator: true,
//       trickle: false,
//       stream: stream
//     });

//     peer.on('signal', data => {
//       axios.post('https://your-signaling-server.com/call', { userId, friendId, signalData: data, isVideo })
//         .then(response => {
//           peer.signal(response.data.signalData);
//         }).catch(error => {
//           console.error('Error sending signal data', error);
//         });
//     });

//     peer.on('stream', stream => {
//       if (friendVideo.current) {
//         friendVideo.current.srcObject = stream; // Check if ref is defined before setting properties
//         friendVideo.current.play();
//       }
//     });

//     setPeer(peer);
//   };

//   const handleMessageSend = () => {
//     if (message.trim() !== '') {
//       setMessages([...messages, { sender: userId, text: message }]);
//       setMessage('');
//     }
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleImageSend = () => {
//     // Logic for sending images goes here
//   };

//   const handleEndCall = () => {
//     if (peer) {
//       peer.destroy();
//       setPeer(null);
//     }
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//     }
//     setStream(null);
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);

//     // Navigate back to the default communication page
//     navigate.push(`/communication/${friendId}/${friendName}`);
//   };

//   const generateUserImgUrl = (firstName) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-900 text-white shadow-md min-h-screen">
//       <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//         <div className="flex items-center gap-6">
//           <img src={generateUserImgUrl(friendName)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
//           <p>{friendName}</p>
//         </div>
//         <div className="flex gap-4">
//           <button onClick={handleAudioCall} className="p-2 bg-green-500 rounded-full hover:bg-green-600"><FaPhoneVolume /></button>
//           <button onClick={handleVideoCall} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"><FaVideo /></button>
//         </div>
//         {friend && (
//           <div className="flex items-center">
//             <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friend.firstName}`} alt="Friend Avatar" className="h-16 w-16 rounded-full mr-4" />
//             <h2 className="text-2xl">{friend.firstName} {friend.lastName}</h2>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full bg-gray-800 rounded-md p-2 overflow-y-scroll mb-4" style={{ flexGrow: 1 }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
//             <p className="inline-block bg-gray-700 rounded-md p-2">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messageEndRef} />
//       </div>

//       {isAudioCallActive && (
//         <div className="flex flex-col items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-4 z-50 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Audio Call with {friend?.firstName}</h2>
//           <button onClick={handleEndCall} className="p-2 bg-red-500 rounded-full hover:bg-red-600 absolute top-2 right-2">
//             <FaTimes className="text-white" />
//           </button>
//           {/* Add your audio call UI here */}
//         </div>
//       )}

//       {isVideoCallActive && (
//         <div className="flex flex-col items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-4 z-50 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Video Call with {friend?.firstName}</h2>
//           <div className="flex gap-4">
//             <video ref={myVideo} className="w-64 h-48 bg-gray-800 rounded-md" muted />
//             <video ref={friendVideo} className="w-64 h-48 bg-gray-800 rounded-md" />
//           </div>
//           <button onClick={handleEndCall} className="p-2 px-4 bg-red-500 rounded hover:bg-red-600 top-2 right-2">
//             <div className="flex items-center gap-2">
//               <FaVideoSlash /> End
//             </div>
//             </button>
//         </div>
//       )}
//         <div className="flex w-full gap-2 fixed bottom-0 left-0 bg-gray-900 p-4 z-10">
//     <input
//       type="text"
//       className="flex-grow p-2 bg-gray-800 rounded-md text-white"
//       placeholder="Type your message..."
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
//     />
//     <button onClick={handleMessageSend} className="p-2 bg-green-500 rounded-full hover:bg-green-600">
//       <FaPaperPlane className="text-white" />
//     </button>
//     <button onClick={handleImageSend} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
//       <FaImage className="text-white" />
//     </button>
//   </div>
// </div>
// );
// };

// export default UserCommunication;












import React, { useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import { FaPhone, FaVideo, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
import { FaVideoSlash, FaPhoneVolume } from 'react-icons/fa6';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000'); 

const UserCommunication = () => {
  const { friendId, friendName } = useParams();
  const navigate = useNavigate(); // Access history object from react-router-dom
  const [userId, setUserId] = useState(null); // State to store userId
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [user, setUser] = useState(null);
  const [friend, setFriend] = useState(null);
  const [isAudioCallActive, setIsAudioCallActive] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  const myVideo = useRef(null); // Initialize refs with null
  const friendVideo = useRef(null);
  const messageEndRef = useRef(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     setUserId(decodedToken.userId); // Set userId from decoded token
  //     socket.emit('join', { token });
  //   }

  //   socket.on('receiveMessage', (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId); // Fetch user profile using userId
    }
    fetchFriendProfile(friendId);
  }, [userId, friendId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUserProfile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const fetchFriendProfile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
      setFriend(response.data.user);
    } catch (error) {
      console.error('Error fetching friend profile', error);
    }
  };

  const handleAudioCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
      initiateCall(false, stream);
      setIsAudioCallActive(true);

      // Update URL with audio call information
      navigate(`/communication/${friendId}/${friendName}/audio-call`);
    } catch (error) {
      console.error('Error starting audio call', error);
    }
  };

  const handleVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream; // Check if ref is defined before setting properties
        myVideo.current.play();
      }
      initiateCall(true, stream);
      setIsVideoCallActive(true);

      // Update URL with video call information
      navigate(`/communication/${friendId}/${friendName}/video-call`);
    } catch (error) {
      console.error('Error starting video call', error);
    }
  };

  const initiateCall = (isVideo, stream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on('signal', data => {
      axios.post('https://your-signaling-server.com/call', { userId, friendId, signalData: data, isVideo })
        .then(response => {
          peer.signal(response.data.signalData);
        }).catch(error => {
          console.error('Error sending signal data', error);
        });
    });

    peer.on('stream', stream => {
      if (friendVideo.current) {
        friendVideo.current.srcObject = stream; // Check if ref is defined before setting properties
        friendVideo.current.play();
      }
    });

    setPeer(peer);
  };

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      // socket.emit('sendMessage', { message, recipientId: friendId });
      setMessages([...messages, { sender: userId, text: message }]);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageSend = () => {
    // Logic for sending images goes here
  };

  const handleEndCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsAudioCallActive(false);
    setIsVideoCallActive(false);

    // Navigate back to the default communication page
    navigate(`/communication/${friendId}/${friendName}`);
  };

  const generateUserImgUrl = (firstName) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white shadow-md min-h-screen">
      <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
        <div className="flex items-center gap-6">
          <img src={generateUserImgUrl(friendName)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
          <p>{friendName}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAudioCall} className="p-2 bg-green-500 rounded-full hover:bg-green-600"><FaPhoneVolume /></button>
          <button onClick={handleVideoCall} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"><FaVideo /></button>
        </div>
        {friend && (
          <div className="flex items-center">
            <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friend.firstName}`} alt="Friend Avatar" className="h-16 w-16 rounded-full mr-4" />
            <h2 className="text-2xl">{friend.firstName} {friend.lastName}</h2>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full bg-gray-800 rounded-md p-2 overflow-y-scroll mb-4" style={{ flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
            <p className="inline-block bg-gray-700 rounded-md p-2">{msg.text}</p>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {isAudioCallActive && (
        <div className="flex flex-col items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-4 z-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Audio Call with {friend?.firstName}</h2>
          <button onClick={handleEndCall} className="p-2 bg-red-500 rounded-full hover:bg-red-600 absolute top-2 right-2">
            <FaTimes className="text-white" />
          </button>
        </div>
      )}

      {isVideoCallActive && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <video ref={myVideo} autoPlay muted className="w-1/2 h-auto rounded-lg mb-4"></video>
          <video ref={friendVideo} autoPlay className="w-1/2 h-auto rounded-lg"></video>
          <button onClick={handleEndCall} className="p-2 bg-red-500 rounded-full hover:bg-red-600 absolute top-2 right-2">
            <FaTimes className="text-white" />
          </button>
        </div>
      )}

      <div className="w-full flex gap-2 mt-2">
        <input
          type="text"
          className="flex-grow p-2 rounded-md bg-gray-700 text-white focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleMessageSend() : null}
        />
        <button onClick={handleMessageSend} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
          <FaPaperPlane />
        </button>
        <button onClick={handleImageSend} className="p-2 bg-gray-500 rounded-full hover:bg-gray-600">
          <FaImage />
        </button>
      </div>
    </div>
  );
};

export default UserCommunication;





