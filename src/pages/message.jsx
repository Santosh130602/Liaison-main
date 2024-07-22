
// import React, { useState, useRef, useEffect } from 'react';
// import SimplePeer from 'simple-peer';
// import { FaPhone, FaVideo, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
// import { FaPhoneVolume } from 'react-icons/fa6';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';
// import {jwtDecode} from 'jwt-decode'; 
// import io from 'socket.io-client';
// import { GoDotFill } from "react-icons/go";

// import { useState } from "react";

// const socket = io('http://localhost:4000'); 

// const Message = () => {
//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);

//   const myVideo = useRef(null);
//   const friendVideo = useRef(null);
//   const messageEndRef = useRef(null);
//   const toast = useToast();

//   const token = localStorage.getItem('token');
//   const decodedToken = token ? jwtDecode(token) : null;
//   const username = decodedToken?.username;
//   const userId = decodedToken?.userId;
//   console.log(userId)

//   const config = token ? {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   } : {};

//   useEffect(() => {
//     fetchUserFriends();

//     if (token) {
//       socket.emit('join', { token });
//     }

//     socket.on('receiveMessage', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId);
//     }
//     if (selectedFriend) {
//       fetchFriendProfile(selectedFriend._id);
//     }
//   }, [userId, selectedFriend]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchUserFriends = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoading(false);
//     }
//   };

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
//       setSelectedFriend(response.data.user);
//     } catch (error) {
//       console.error('Error fetching friend profile', error);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     toast({
//       title: errorMessage,
//       status: 'error',
//       duration: 5000,
//       isClosable: true,
//       position: 'top',
//     });
//     setLoading(false);
//   };

//   const handleFriendClick = (friend) => {
//     setSelectedFriend(friend);
//   };

//   const handleMessageSend = () => {
//     if (message.trim() !== '') {
//       socket.emit('sendMessage', { message, recipientId: selectedFriend._id });
//       setMessages([...messages, { sender: userId, text: message }]);
//       setMessage('');
//     }
//   };

//   const handleAudioCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setStream(stream);
//       initiateCall(false, stream);
//       setIsAudioCallActive(true);
//     } catch (error) {
//       console.error('Error starting audio call', error);
//     }
//   };

//   const handleVideoCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(stream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = stream;
//         myVideo.current.play();
//       }
//       initiateCall(true, stream);
//       setIsVideoCallActive(true);
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
//       axios.post('https://your-signaling-server.com/call', { userId, friendId: selectedFriend._id, signalData: data, isVideo })
//         .then(response => {
//           peer.signal(response.data.signalData);
//         }).catch(error => {
//           console.error('Error sending signal data', error);
//         });
//     });

//     peer.on('stream', stream => {
//       if (friendVideo.current) {
//         friendVideo.current.srcObject = stream;
//         friendVideo.current.play();
//       }
//     });

//     setPeer(peer);
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
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   return (
//     <div className="flex bg-black h-screen">
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map(friend => (
//               <li key={friend._id} className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2" onClick={() => handleFriendClick(friend)}>
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16  flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                 <img src={generateUserImgUrl(selectedFriend.username)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
//                 </div>
//                 <div >
//                 <p>{selectedFriend.username}</p>

//                 <statusbar className="text-xs  text-slate-500 ">offline</statusbar>

//                 </div>
//               </div>
//               <div className="flex gap-4">
//                 <button onClick={handleAudioCall} className="p-2 bg-green-500 rounded-full hover:bg-green-600"><FaPhoneVolume /></button>
//                 <button onClick={handleVideoCall} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"><FaVideo /></button>
//               </div>
//             </div>
//             <div className="flex flex-col w-full bg-gray-800 rounded-md p-2 overflow-y-scroll mb-4" style={{ flexGrow: 1 }}>
//               {messages.map((msg, index) => (
//                 <div key={index} className={`mb-2 ${msg.sender === userId ? 'self-end' : 'self-start'} max-w-xs`}>
//                   <div className={`p-2 rounded-md ${msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//               <div ref={messageEndRef} />
//             </div>
//             <div className="flex w-full items-center">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="flex-grow p-2 rounded-l-md bg-gray-700 text-white"
//                 placeholder="Type a message..."
//               />
//               <button onClick={handleMessageSend} className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r-md"><FaPaperPlane /></button>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">Select a friend to start chatting</div>
//         )}
//       </div>
//       {isVideoCallActive && (
//         <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80">
//           <video ref={myVideo} muted className="w-1/2 h-1/2" />
//           <video ref={friendVideo} className="w-1/2 h-1/2" />
//           <button onClick={handleEndCall} className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600"><FaTimes /></button>
//         </div>
//       )}
//       {isAudioCallActive && (
//         <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80">
//           <div className="w-1/2 h-1/2 flex flex-col items-center justify-center">
//             <FaPhoneVolume className="text-white text-8xl" />
//             <button onClick={handleEndCall} className="mt-4 p-2 bg-red-500 rounded-full hover:bg-red-600"><FaTimes /></button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;















// import React, { useState, useRef, useEffect } from 'react';
// import SimplePeer from 'simple-peer';
// import { FaPhone, FaVideo, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
// import { FaPhoneVolume } from 'react-icons/fa6';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react';
// import {jwtDecode} from 'jwt-decode'; 
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000'); 

// const Message = () => {
//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);

//   const myVideo = useRef(null);
//   const friendVideo = useRef(null);
//   const messageEndRef = useRef(null);
//   const toast = useToast();

//   const token = localStorage.getItem('token');
//   const decodedToken = token ? jwtDecode(token) : null;
//   const username = decodedToken?.username;
//   const userId = decodedToken?.userId;

//   const config = token ? {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   } : {};

//   useEffect(() => {
//     fetchUserFriends();

//     if (token) {
//       socket.emit('join', { token });
//     }

//     socket.on('receiveMessage', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [token]);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (selectedFriend) {
//       fetchFriendProfile(selectedFriend._id);
//     }
//   }, [selectedFriend]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchUserFriends = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`, config);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user profile', error);
//     }
//   };

//   const fetchFriendProfile = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`, config);
//       setSelectedFriend(response.data.user);
//     } catch (error) {
//       console.error('Error fetching friend profile', error);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     toast({
//       title: errorMessage,
//       status: 'error',
//       duration: 5000,
//       isClosable: true,
//       position: 'top',
//     });
//     setLoading(false);
//   };

//   const handleFriendClick = (friend) => {
//     setSelectedFriend(friend);
//     fetchFriendMessages(friend._id);
//   };

//   const fetchFriendMessages = async (friendId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/messages/${friendId}`, config);
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.error('Error fetching friend messages', error);
//     }
//   };

//   const handleMessageSend = () => {
//     if (message.trim() !== '') {
//       socket.emit('sendMessage', { message, recipientId: selectedFriend._id });
//       setMessages([...messages, { sender: userId, text: message }]);
//       setMessage('');
//     }
//   };

//   const handleAudioCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setStream(stream);
//       initiateCall(false, stream);
//       setIsAudioCallActive(true);
//     } catch (error) {
//       console.error('Error starting audio call', error);
//     }
//   };

//   const handleVideoCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(stream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = stream;
//         myVideo.current.play();
//       }
//       initiateCall(true, stream);
//       setIsVideoCallActive(true);
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
//       axios.post('https://your-signaling-server.com/call', { userId, friendId: selectedFriend._id, signalData: data, isVideo })
//         .then(response => {
//           peer.signal(response.data.signalData);
//         }).catch(error => {
//           console.error('Error sending signal data', error);
//         });
//     });

//     peer.on('stream', stream => {
//       if (friendVideo.current) {
//         friendVideo.current.srcObject = stream;
//         friendVideo.current.play();
//       }
//     });

//     setPeer(peer);
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
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   return (
//     <div className="flex bg-black h-screen">
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map(friend => (
//               <li key={friend._id} className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2" onClick={() => handleFriendClick(friend)}>
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>


//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img src={generateUserImgUrl(selectedFriend.username)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">ofline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                       <p className="text-white">{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>
//             <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//               <input
//                 type="text"
//                 className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//               />
//               <button onClick={handleMessageSend} className="focus:outline-none">
//                 <FaPaperPlane className="text-blue-400 text-xl" />
//               </button>
//             </div>
//             {isVideoCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <video ref={myVideo} className="w-1/2" muted />
//                 <video ref={friendVideo} className="w-1/2" />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-white text-xl">
//             Select a friend to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;



























// import {jwtDecode} from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token ? {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   } : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//       console.log(response.data);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   console.log(userId)

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   return (
//     <div>
//       {/* Your component content */}
//       {loadingProfile ? (
//         <div>Loading...</div>
//       ) : (
//         <ul>
//           {friends.map(friend => (
//             <li key={friend._id}>{friend.username}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Message;



























// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token ? {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   } : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//       console.log(response.data);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };
//   // const handleFriendClick = () =>{

//   // }

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     setSelectedFriendId(friendId);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   return (
//     <div className='flex bg-black h-screen'>
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map(friend => (
//               <li key={friend._id} className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2" onClick={() => handleFriendSelect(friend._id)}>
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>



//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//        {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img src={generateUserImgUrl(selectedFriend.username)} className="rounded-full h-12 w-12" alt="Friend Avatar" />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">ofline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                       <p className="text-white">{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>
//             <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//               <input
//                 type="text"
//                 className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//               />
//               <button onClick={handleMessageSend} className="focus:outline-none">
//                 <FaPaperPlane className="text-blue-400 text-xl" />
//               </button>
//             </div>
//             {isVideoCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <video ref={myVideo} className="w-1/2" muted />
//                 <video ref={friendVideo} className="w-1/2" />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-white text-xl">
//             Select a friend to start messaging
//           </div>
//         )}
//       </div>




//     </div>
//   );
// };

// export default Message;










// import {jwtDecode} from 'jwt-decode';
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);

//   const messageEndRef = useRef(null);
//   const myVideo = useRef(null);
//   const friendVideo = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-type': 'application/json',
//         },
//       }
//     : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };
//   // console.log(friends)

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     const friend = friends.find(f => f._id === friendId);
//     setSelectedFriendId(friendId);
//     setSelectedFriend(friend);
//     // Load messages with the selected friend here
//     setMessages([]);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleMessageSend = () => {
//     if (message.trim() === '') return;
//     // Add the message sending logic here
//     setMessages([...messages, { sender: userId, text: message }]);
//     setMessage('');
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleAudioCall = () => {
//     setIsAudioCallActive(true);
//     // Add audio call handling logic here
//   };

//   const handleVideoCall = () => {
//     setIsVideoCallActive(true);
//     // Add video call handling logic here
//   };

//   const handleEndCall = () => {
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);
//     // Add call ending logic here
//   };

//   return (
//     <div className="flex bg-black h-screen">
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loadingProfile ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
//                 onClick={() => handleFriendSelect(friend._id)}
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img
//                     src={generateUserImgUrl(selectedFriend.username)}
//                     className="rounded-full h-12 w-12"
//                     alt="Friend Avatar"
//                   />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">offline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                       <p className="text-white">{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>
//             <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//               <input
//                 type="text"
//                 className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//               />
//               <button onClick={handleMessageSend} className="focus:outline-none">
//                 <FaPaperPlane className="text-blue-400 text-xl" />
//               </button>
//             </div>
//             {isVideoCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <video ref={myVideo} className="w-1/2" muted />
//                 <video ref={friendVideo} className="w-1/2" />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-white text-xl">
//             Select a friend to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;





// import {jwtDecode} from 'jwt-decode';
// import { useState, useEffect, useRef } from 'react';
// import socket from 'socket.io-client';
// import axios from 'axios';
// import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';
// import SmallSideBar from '../components/general/smallsidebar';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);

//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//       const io = socket('http://localhost:4000'); // Replace with your server URL
//       io.emit('join', userId);

//       io.on('receiveMessage', (message) => {
//         setMessages([...messages, message]);
//         messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       });

//       return () => {
//         io.disconnect();
//       };
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-type': 'application/json',
//         },
//       }
//     : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     const friend = friends.find((f) => f._id === friendId);
//     setSelectedFriendId(friendId);
//     setSelectedFriend(friend);
//     setMessages([]);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleMessageSend = () => {
//     if (message.trim() === '') return;
//     socket.emit('sendMessage', { senderId: userId, receiverId: selectedFriendId, text: message });
//     setMessages([...messages, { sender: userId, text: message }]);
//     setMessage('');
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };
//     const handleAudioCall = () => {
//       setIsAudioCallActive(true);
//       // Add audio call handling logic here
//     };

//     const handleVideoCall = () => {
//       setIsVideoCallActive(true);
//       // Add video call handling logic here
//     };

//     const handleEndCall = () => {
//       setIsAudioCallActive(false);
//       setIsVideoCallActive(false);
//       // Add call ending logic here
//     };

//     return (
//       <div className="flex bg-black h-screen ">
//         <SmallSideBar/>
//         {/* Left Sidebar */}
//         <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto ml-20">
//           <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//           {loadingProfile ? (
//             <div className="flex justify-center items-center">
//               <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <ul>
//               {friends.map((friend) => (
//                 <li
//                   key={friend._id}
//                   className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
//                   onClick={() => handleFriendSelect(friend._id)}
//                 >
//                   <div className="flex items-center">
//                     <img
//                       src={generateUserImgUrl(friend.username)}
//                       alt="Friend Avatar"
//                       className="h-8 w-8 rounded-full mr-2"
//                     />
//                     <span className="text-white">{friend.username}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Right Message Panel */}
//         <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//           {selectedFriend ? (
//             <>
//               {/* Friend Header */}
//               <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//                 <div className="flex items-center ml-4 gap-6">
//                   <div>
//                     <img
//                       src={generateUserImgUrl(selectedFriend.username)}
//                       className="rounded-full h-12 w-12"
//                       alt="Friend Avatar"
//                     />
//                   </div>
//                   <div>
//                     <p>{selectedFriend.username}</p>
//                     <statusbar className="text-xs text-slate-300">offline</statusbar>
//                   </div>
//                 </div>
//                 <div className="flex gap-4 mr-4">
//                   <button onClick={handleAudioCall} className="focus:outline-none">
//                     <FaPhone className="text-green-400 text-xl" />
//                   </button>
//                   <button onClick={handleVideoCall} className="focus:outline-none">
//                     <FaVideo className="text-blue-400 text-xl" />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 p-4 w-full overflow-y-auto">
//                 <div className="space-y-4">
//                   {messages.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                         <p className="text-white">{msg.text}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messageEndRef} />
//                 </div>
//               </div>

//               {/* Message Input */}
//               <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                   placeholder="Type your message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//                 />
//                 <button onClick={handleMessageSend} className="focus:outline-none">
//                   <FaPaperPlane className="text-blue-400 text-xl" />
//                 </button>
//               </div>

//               {/* Video Call Modal */}
//               {isVideoCallActive && (
//                 <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                   <video className="w-1/2" muted />
//                   <video className="w-1/2" />
//                   <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                     <FaTimes className="text-3xl" />
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full text-white text-xl">
//               Select a friend to start messaging
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   export default Message;   






























// import React, { useState, useEffect, useRef } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';
// import SmallSideBar from '../components/general/smallsidebar';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);

//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const localAudioRef = useRef();
//   const remoteAudioRef = useRef();
//   const peerConnection = useRef(new RTCPeerConnection());
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//       const socket = io('http://localhost:4000'); // Replace with your server URL
//       socket.emit('join', userId);

//       socket.on('receiveMessage', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//         messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       });

//       socket.on('offer', handleOffer);
//       socket.on('answer', handleAnswer);
//       socket.on('ice-candidate', handleIceCandidate);

//       return () => {
//         socket.disconnect();
//       };
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-type': 'application/json',
//         },
//       }
//     : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     const friend = friends.find((f) => f._id === friendId);
//     setSelectedFriendId(friendId);
//     setSelectedFriend(friend);
//     setMessages([]);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleMessageSend = () => {
//     if (message.trim() === '') return;
//     socket.emit('sendMessage', { senderId: userId, receiverId: selectedFriendId, text: message });
//     setMessages([...messages, { sender: userId, text: message }]);
//     setMessage('');
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleAudioCall = () => {
//     setIsAudioCallActive(true);
//     startAudioCall();
//   };

//   const handleVideoCall = () => {
//     setIsVideoCallActive(true);
//     startVideoCall();
//   };

//   const handleEndCall = () => {
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);
//     peerConnection.current.close();
//   };

//   const startAudioCall = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       localAudioRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const startVideoCall = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const createOffer = () => {
//     peerConnection.current.createOffer().then((offer) => {
//       peerConnection.current.setLocalDescription(offer);
//       socket.emit('offer', {
//         caller: userId,
//         target: selectedFriendId,
//         sdp: offer,
//       });
//     });
//   };

//   const handleOffer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//     peerConnection.current.createAnswer().then((answer) => {
//       peerConnection.current.setLocalDescription(answer);
//       socket.emit('answer', {
//         target: payload.caller,
//         sdp: answer,
//       });
//     });
//   };

//   const handleAnswer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//   };

//   const handleIceCandidate = (payload) => {
//     peerConnection.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
//   };

//   return (
//     <div className="flex bg-black h-screen ">
//       <SmallSideBar />
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto ml-20">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loadingProfile ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
//                 onClick={() => handleFriendSelect(friend._id)}
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img
//                     src={generateUserImgUrl(selectedFriend.username)}
//                     className="rounded-full h-12 w-12"
//                     alt="Friend Avatar"
//                   />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">offline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
// <p className="text-white">{msg.text}</p>
// </div>
// </div>
// ))}
// <div ref={messageEndRef} />
// </div>
// </div>
// <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//           <input
//             type="text"
//             className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//             placeholder="Type your message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//           />
//           <button onClick={handleMessageSend} className="focus:outline-none">
//             <FaPaperPlane className="text-blue-400 text-xl" />
//           </button>
//         </div>

//         {isVideoCallActive && (
//           <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//             <video ref={localVideoRef} className="w-1/2" autoPlay muted />
//             <video ref={remoteVideoRef} className="w-1/2" autoPlay />
//             <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//               <FaTimes className="text-3xl" />
//             </button>
//           </div>
//         )}

//         {isAudioCallActive && (
//           <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//             <audio ref={localAudioRef} autoPlay muted />
//             <audio ref={remoteAudioRef} autoPlay />
//             <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//               <FaTimes className="text-3xl" />
//             </button>
//           </div>
//         )}
//       </>
//     ) : (
//       <div className="flex items-center justify-center h-full text-white text-xl">
//         Select a friend to start messaging
//       </div>
//     )}
//   </div>
// </div>
// );
// };

// export default Message;







// import React, { useState, useEffect, useRef } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';
// import SmallSideBar from '../components/general/smallsidebar';

// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);

//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const localAudioRef = useRef();
//   const remoteAudioRef = useRef();
//   const peerConnection = useRef(new RTCPeerConnection());
//   const messageEndRef = useRef(null);
//   const socket = useRef(null); // Ref for socket

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserFriends();
//       socket.current = io('http://localhost:4000'); // Initialize socket
//       socket.current.emit('join', userId);

//       socket.current.on('receiveMessage', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//         messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       });

//       socket.current.on('offer', handleOffer);
//       socket.current.on('answer', handleAnswer);
//       socket.current.on('ice-candidate', handleIceCandidate);

//       return () => {
//         socket.current.disconnect(); // Disconnect socket on cleanup
//       };
//     }
//   }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-type': 'application/json',
//         },
//       }
//     : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     const friend = friends.find((f) => f._id === friendId);
//     setSelectedFriendId(friendId);
//     setSelectedFriend(friend);
//     setMessages([]);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleMessageSend = () => {
//     if (message.trim() === '') return;
//     socket.current.emit('sendMessage', { senderId: userId, receiverId: selectedFriendId, text: message });
//     setMessages([...messages, { sender: userId, text: message }]);
//     setMessage('');
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleAudioCall = () => {
//     setIsAudioCallActive(true);
//     startAudioCall();
//   };

//   const handleVideoCall = () => {
//     setIsVideoCallActive(true);
//     startVideoCall();
//   };

//   const handleEndCall = () => {
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);
//     peerConnection.current.close();
//   };

//   const startAudioCall = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       localAudioRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const startVideoCall = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const createOffer = () => {
//     peerConnection.current.createOffer().then((offer) => {
//       peerConnection.current.setLocalDescription(offer);
//       socket.current.emit('offer', {
//         caller: userId,
//         target: selectedFriendId,
//         sdp: offer,
//       });
//     });
//   };

//   const handleOffer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//     peerConnection.current.createAnswer().then((answer) => {
//       peerConnection.current.setLocalDescription(answer);
//       socket.current.emit('answer', {
//         target: payload.caller,
//         sdp: answer,
//       });
//     });
//   };

//   const handleAnswer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//   };

//   const handleIceCandidate = (payload) => {
//     peerConnection.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
//   };

//   return (
//     <div className="flex bg-black h-screen">
//       <SmallSideBar />
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto ml-20">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loadingProfile ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
//                 onClick={() => handleFriendSelect(friend._id)}
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img
//                     src={generateUserImgUrl(selectedFriend.username)}
//                     className="rounded-full h-12 w-12"
//                     alt="Friend Avatar"
//                   />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">offline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                       <p className="text-white">{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>

//             <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//               <input
//                 type="text"
//                 className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//               />
//               <button onClick={handleMessageSend} className="focus:outline-none">
//                 <FaPaperPlane className="text-blue-400 text-xl" />
//               </button>
//             </div>

//             {isVideoCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <video ref={localVideoRef} className="w-1/2" autoPlay muted />
//                 <video ref={remoteVideoRef} className="w-1/2" autoPlay />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}

//             {isAudioCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <audio ref={localAudioRef} autoPlay muted />
//                 <audio ref={remoteAudioRef} autoPlay />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-white text-xl">
//             Select a friend to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;










// import React, { useState, useEffect, useRef } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';
// import SmallSideBar from '../components/general/smallsidebar';


// const Message = () => {
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [chat, setChat] = useState([])
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isAudioCallActive, setIsAudioCallActive] = useState(false);

//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const localAudioRef = useRef();
//   const remoteAudioRef = useRef();
//   const peerConnection = useRef(new RTCPeerConnection());
//   const messageEndRef = useRef(null);
//   const socket = useRef(null); // Ref for socket

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.id);
//     }
//   }, []);

//   // useEffect(() => {
//   //   if (userId) {
//   //     fetchUserFriends();
//   //     // socket.current = io('http://localhost:4000'); 
//   //     // socket.current.emit('join', userId);

//   //     // socket.current.on('receiveMessage', (message) => {
//   //     //   setMessages((prevMessages) => [...prevMessages, message]);
//   //     //   messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   //     // });

//   //     socket.current.on('offer', handleOffer);
//   //     socket.current.on('answer', handleAnswer);
//   //     socket.current.on('ice-candidate', handleIceCandidate);

//   //     return () => {
//   //       socket.current.disconnect(); // Disconnect socket on cleanup
//   //     };
//   //   }
//   // }, [userId]);

//   const token = localStorage.getItem('token');
//   const config = token
//     ? {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-type': 'application/json',
//       },
//     }
//     : {};

//   const fetchUserFriends = async () => {
//     setLoadingProfile(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
//       setFriends(response.data.friends);
//     } catch (error) {
//       handleFetchError(error, 'friends');
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   const handleFetchError = (error, type) => {
//     const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//     console.error(errorMessage);
//   };

//   const handleFriendSelect = (friendId) => {
//     const friend = friends.find((f) => f._id === friendId);
//     setSelectedFriendId(friendId);
//     setSelectedFriend(friend);
//     setMessages([]);
//     console.log('Selected Friend ID:', friendId);
//   };

//   const generateUserImgUrl = (username) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//   };

//   const handleMessageSend = () => {
//     if (message.trim() === '') return;
//     socket.current.emit('sendMessage', { senderId: userId, receiverId: selectedFriendId, text: message });
//     setMessages([...messages, { sender: userId, text: message }]);
//     setMessage('');
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleAudioCall = () => {
//     setIsAudioCallActive(true);
//     startAudioCall();
//   };

//   const handleVideoCall = () => {
//     setIsVideoCallActive(true);
//     startVideoCall();
//   };

//   const handleEndCall = () => {
//     setIsAudioCallActive(false);
//     setIsVideoCallActive(false);
//     peerConnection.current.close();
//   };

//   const startAudioCall = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       localAudioRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const startVideoCall = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
//       createOffer();
//     });
//   };

//   const createOffer = () => {
//     peerConnection.current.createOffer().then((offer) => {
//       peerConnection.current.setLocalDescription(offer);
//       socket.current.emit('offer', {
//         caller: userId,
//         target: selectedFriendId,
//         sdp: offer,
//       });
//     });
//   };

//   const handleOffer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//     peerConnection.current.createAnswer().then((answer) => {
//       peerConnection.current.setLocalDescription(answer);
//       socket.current.emit('answer', {
//         target: payload.caller,
//         sdp: answer,
//       });
//     });
//   };

//   const handleAnswer = (payload) => {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
//   };

//   const handleIceCandidate = (payload) => {
//     peerConnection.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
//   };



//   const getUserChats = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/message/${userId}`);
//       setChat(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching user chats:', error);
//     }
//   };






//   return (
//     <div className="flex bg-black h-screen">
//       <SmallSideBar />
//       <div className="w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto ml-20">
//         <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
//         {loadingProfile ? (
//           <div className="flex justify-center items-center">
//             <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <ul>
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
//                 onClick={() => handleFriendSelect(friend._id)}
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={generateUserImgUrl(friend.username)}
//                     alt="Friend Avatar"
//                     className="h-8 w-8 rounded-full mr-2"
//                   />
//                   <span className="text-white">{friend.username}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
//         {selectedFriend ? (
//           <>
//             <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
//               <div className="flex items-center ml-4 gap-6">
//                 <div>
//                   <img
//                     src={generateUserImgUrl(selectedFriend.username)}
//                     className="rounded-full h-12 w-12"
//                     alt="Friend Avatar"
//                   />
//                 </div>
//                 <div>
//                   <p>{selectedFriend.username}</p>
//                   <statusbar className="text-xs text-slate-300">offline</statusbar>
//                 </div>
//               </div>
//               <div className="flex gap-4 mr-4">
//                 <button onClick={handleAudioCall} className="focus:outline-none">
//                   <FaPhone className="text-green-400 text-xl" />
//                 </button>
//                 <button onClick={handleVideoCall} className="focus:outline-none">
//                   <FaVideo className="text-blue-400 text-xl" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 p-4 w-full overflow-y-auto">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`${msg.sender === userId ? 'bg-blue-500' : 'bg-gray-700'} p-2 rounded-lg`}>
//                       <p className="text-white">{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
//             </div>

//             <div className="p-2 w-full flex items-center gap-2 border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
//               <input
//                 type="text"
//                 className="flex-1 p-2 bg-gray-800 text-white rounded-lg outline-none"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
//               />
//               <button onClick={handleMessageSend} className="focus:outline-none">
//                 <FaPaperPlane className="text-blue-400 text-xl" />
//               </button>
//             </div>

//             {isVideoCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <video ref={localVideoRef} className="w-1/2" autoPlay muted />
//                 <video ref={remoteVideoRef} className="w-1/2" autoPlay />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}

//             {isAudioCallActive && (
//               <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
//                 <audio ref={localAudioRef} autoPlay muted />
//                 <audio ref={remoteAudioRef} autoPlay />
//                 <button onClick={handleEndCall} className="focus:outline-none mt-4 text-white">
//                   <FaTimes className="text-3xl" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-white text-xl">
//             Select a friend to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;




import React, { useState, useEffect, useRef } from 'react';
import {jwtDecode} from 'jwt-decode';
import io from 'socket.io-client';
import axios from 'axios';
import { FaPhone, FaVideo, FaPaperPlane, FaTimes } from 'react-icons/fa';
import SmallSideBar from '../components/general/smallsidebar';

const Message = () => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userId, setUserId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isAudioCallActive, setIsAudioCallActive] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const peerConnection = useRef(new RTCPeerConnection());
  const messageEndRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserFriends();
      socket.current = io('http://localhost:4000');
      socket.current.emit('join', userId);

      socket.current.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      socket.current.on('offer', handleOffer);
      socket.current.on('answer', handleAnswer);
      socket.current.on('ice-candidate', handleIceCandidate);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUserChats(userId);
    }
  }, [userId]);

  const token = localStorage.getItem('token');
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    : {};

  const fetchUserFriends = async () => {
    setLoadingProfile(true);
    try {
      const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
      setFriends(response.data.friends);
    } catch (error) {
      handleFetchError(error, 'friends');
    } finally {
      setLoadingProfile(false);
    }
  };
  // console.log(friends)

  const handleFetchError = (error, type) => {
    const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
    console.error(errorMessage);
  };

  const handleFriendSelect = (friendId) => {
    const friend = friends.find((f) => f._id === friendId);
    setSelectedFriendId(friendId);
    setSelectedFriend(friend);
    setMessages([]);
    console.log('Selected Friend ID:', friendId);
  };



  const generateUserImgUrl = (username) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${username}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
  };

  const handleMessageSend = () => {
    if (message.trim() === '') return;
    socket.current.emit('sendMessage', { senderId: userId, receiverId: selectedFriendId, text: message });
    setMessages([...messages, { sender: userId, text: message }]);
    setMessage('');
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAudioCall = () => {
    setIsAudioCallActive(true);
    startAudioCall();
  };

  const handleVideoCall = () => {
    setIsVideoCallActive(true);
    startVideoCall();
  };

  const handleEndCall = () => {
    setIsAudioCallActive(false);
    setIsVideoCallActive(false);
    peerConnection.current.close();
  };

  const startAudioCall = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      localAudioRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
      createOffer();
    });
  };

  const startVideoCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
      createOffer();
    });
  };

  const createOffer = () => {
    peerConnection.current.createOffer().then((offer) => {
      peerConnection.current.setLocalDescription(offer);
      socket.current.emit('offer', {
        caller: userId,
        target: selectedFriendId,
        sdp: offer,
      });
    });
  };

  const handleOffer = (payload) => {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
    peerConnection.current.createAnswer().then((answer) => {
      peerConnection.current.setLocalDescription(answer);
      socket.current.emit('answer', {
        target: payload.caller,
        sdp: answer,
      });
    });
  };

  const handleAnswer = (payload) => {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload.sdp));
  };

  const handleIceCandidate = (payload) => {
    peerConnection.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
  };

  const getUserChats = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/message/${userId}`);
      setChat(response.data);
      
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  };
  console.log(chat)

  return (
    <div className="flex bg-black h-screen">
      <SmallSideBar />
      <div className="message1 w-1/6 bg-gray-900 mt-16 p-4 overflow-y-auto ml-20">
        <h1 className="text-white text-xl font-bold mb-4">Friends</h1>
        {loadingProfile ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul>
            {friends.map((friend) => (
              <>
              <li
                key={friend._id}
                className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
                onClick={() => handleFriendSelect(friend._id)}
                >
                <div className="flex items-center">
                  <img
                    src={generateUserImgUrl(friend.username)}
                    alt="Friend Avatar"
                    className="h-8 w-8 rounded-full mr-2"
                    />
                  <span className="text-white">{friend.username}</span>
                </div>
              </li>
              <hr className='text-green-700'/>
              
                    </>
            ))}
            
          </ul>
        )}
      </div>

      <div className="message2 w-5/6 bg-gray-800 text-slate-300 mt-16 flex flex-col items-center">
        {selectedFriend ? (
          <>
            <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-gray-900 p-2 z-10">
              <div className="flex items-center ml-4 gap-6">
                <div>
                  <img
                    src={generateUserImgUrl(selectedFriend.username)}
                    className="rounded-full h-12 w-12"
                    alt="Friend Avatar"
                  />
                </div>
                <div>
                  <p>{selectedFriend.username}</p>
                  <statusbar className="text-xs text-slate-300">offline</statusbar>
                </div>
              </div>
              <div className="flex gap-4 mr-4">
                <button onClick={handleAudioCall} className="p-2 bg-green-600 hover:bg-green-700 rounded-full">
                  <FaPhone />
                </button>
                <button onClick={handleVideoCall} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full">
                  <FaVideo />
                </button>
              </div>
            </div>

            <div className="flex-grow w-full px-2 py-2 overflow-y-auto">
              <div className="h-full flex flex-col justify-between">
                <div>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${
                        msg.sender === userId ? 'text-right' : 'text-left'
                      } mb-2`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          msg.sender === userId ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
                        }`}
                      >
                        {msg.text}
                      </span>
                    </div>
                  ))}
                  <div ref={messageEndRef}></div>
                </div>

                <div className="mt-2">
                  {isVideoCallActive && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                      <div className="flex flex-col items-center">
                        <video ref={localVideoRef} autoPlay playsInline className="w-1/2 mb-2"></video>
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2"></video>
                        <button
                          onClick={handleEndCall}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-full mt-4"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  )}

                  {isAudioCallActive && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                      <div className="flex flex-col items-center">
                        <audio ref={localAudioRef} autoPlay></audio>
                        <audio ref={remoteAudioRef} autoPlay></audio>
                        <button
                          onClick={handleEndCall}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-full mt-4"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center p-2 bg-gray-700 sticky bottom-0">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white rounded"
                placeholder="Type a message..."
              />
              <button
                onClick={handleMessageSend}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full ml-2"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 mt-4">Select a friend to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Message;


