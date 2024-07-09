// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment } from 'react-icons/fa';
// import { FcLike } from 'react-icons/fc';


// const HomePage = () => {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState({});
//     const [loadingPost, setLoadingPost] = useState(false);
//     const [loadingComment, setLoadingComment] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [newComment, setNewComment] = useState('');
//     const [currentPostId, setCurrentPostId] = useState(null);

//     const toast = useToast();

//     const token = localStorage.getItem('token');
//     const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     };

//     const getAllPosts = async () => {
//         setLoadingPost(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/posts', config);
//             const { userId, posts } = response.data;
//             setUserId(userId);
//             setPosts(posts);
//             setLoadingPost(false);
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingPost(false);
//         }
//     };

//     useEffect(() => {
//         getAllPosts();
//     }, []);

//     const handleLikePost = async (id) => {
//         try {
//             await axios.put(`http://localhost:4000/api/posts/addlike/${id}`, {}, config);
//             getAllPosts();
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleComment = async (id) => {
//         setCurrentPostId(id);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${id}/getallcomments`, config);
//             const allComments = response.data;
//             setComments(prevComments => ({
//                 ...prevComments,
//                 [id]: allComments,
//             }));
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddComment = async () => {
//         setLoadingComment(true);
//         if (!newComment.trim()) {
//             toast({
//                 title: "Add some comment text first",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//             return;
//         }

//         try {
//             await axios.post(`http://localhost:4000/api/comments/addcomment`, { postId: currentPostId, text: newComment }, config);
//             toast({
//                 title: "Comment added successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             handleComment(currentPostId);
//             setNewComment('');
//             setLoadingComment(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     const calculateTimeDifference = (updatedAt) => {
//         const now = new Date();
//         const updatedTime = new Date(updatedAt);
//         const diffInSeconds = Math.floor((now - updatedTime) / 1000);
//         const diffInMinutes = Math.floor(diffInSeconds / 60);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds}s`;
//         } else if (diffInMinutes < 60) {
//             return `${diffInMinutes}m`;
//         } else if (diffInMinutes < 1440) { // 60 * 24
//             return `${Math.floor(diffInMinutes / 60)}h`;
//         } else if (diffInMinutes < 10080) { // 60 * 24 * 7
//             return `${Math.floor(diffInMinutes / 1440)}d`;
//         } else {
//             return `${Math.floor(diffInMinutes / 10080)}w`;
//         }
//     };

//     return (
//         <>

//             <div className='flex'>
//                 {/* Left Section for Navigation */}
//                 <div className="w-1/5 bg-gray-200 h-[100vh] p-4">
//                     <ul className="space-y-4">
//                         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md">Home</li> 
//                         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md">Profile</li>
//                         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md">Logout</li>
//                         <li className="cursor-pointer bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-md">Settings</li>
//                     </ul>
//                 </div>

//                 {/* Right Section for Posts */}
//                 <div className="w-4/5 p-8">
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-7/12 justify-center items-center m-20">
//                         {loadingPost ? (
//                             <Spinner animation="border" />
//                         ) : (
//                             posts.map((post) => (
//                                 <div key={post._id} className="bg-white p-4 rounded-md shadow-md ">
//                                     <div className="flex items-center mb-2">
//                                         <img src={generateUserImgUrl(post.user.username)} alt="User" className="h-8 w-8 rounded-full mr-2" />
//                                         <span className="text-sm font-medium">{post.user.username}</span>
//                                         <span className="ml-2 text-xs text-gray-500">{calculateTimeDifference(post.createdAt)}</span>
//                                     </div>
//                                     <div className="mb-4">
//                                         <img src={post.post} alt="Post" className="w-full rounded-md" onClick={() => handleComment(post._id)} />
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center space-x-4">
//                                             {post.likes.includes(userId) ? (
//                                                 <FcLike className="text-red-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)}  /> 
//                                             ) : (
//                                                 <FaRegHeart className="text-gray-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
//                                             )}
//                                             <FaRegComment
//                                                 className="text-gray-500 cursor-pointer"
//                                                 onClick={() => handleComment(post._id)}
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#commentModal"
//                                             />
//                                         </div>
//                                         <div className="text-xs text-gray-500">{post.likes.length} likes</div>
//                                     </div>
//                                     <hr className='mt-3'></hr>
//                                         <div className='text-xs text-gray-500 mt-3 text-left'>
//                                             {post.caption}
//                                         </div>
//                                     {/* Modal for comments */}
//                                     <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
//                                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                                             <div className="modal-content">
//                                                 <div className="modal-header">
//                                                     <h5 className="modal-title" id="commentModalLabel">Comments</h5>
//                                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setNewComment('')}></button>
//                                                 </div>
//                                                 <div className="modal-body">
//                                                     {comments[currentPostId]?.length > 0 ? (
//                                                         <div className="space-y-2">
//                                                             {comments[currentPostId].map(comment => (
//                                                                 <div key={comment._id} className="flex items-start">
//                                                                     <img src={generateUserImgUrl(comment.user.username)} alt="User" className="h-6 w-6 rounded-full" />
//                                                                     <div className="ml-2">
//                                                                         <span className="font-medium">{comment.user.username}</span>
//                                                                         <p className="text-sm">{comment.text}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <p className="text-sm text-gray-500">No comments found.</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="modal-footer">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                                                         placeholder="Add a comment"
//                                                         value={newComment}
//                                                         onChange={(e) => setNewComment(e.target.value)}
//                                                     />
//                                                     <button
//                                                         className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
//                                                         onClick={handleAddComment}
//                                                         disabled={loadingComment}
//                                                     >
//                                                         {loadingComment ? <Spinner animation="border" size="sm" /> : 'Add Comment'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default HomePage;
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment } from 'react-icons/fa';
// import { FcLike } from 'react-icons/fc';
// import SideBar from '../components/general/sideBar';

// const HomePage = () => {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState({});
//     const [loadingPost, setLoadingPost] = useState(false);
//     const [loadingComment, setLoadingComment] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [newComment, setNewComment] = useState('');
//     const [currentPostId, setCurrentPostId] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const toast = useToast();

//     const token = localStorage.getItem('token');
//     const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     };

//     const getAllPosts = async () => {
//         setLoadingPost(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/posts', config);
//             const { userId, posts } = response.data;
//             setUserId(userId || '');
//             setPosts(posts);
//             setLoadingPost(false);
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingPost(false);
//         }
//     };

//     useEffect(() => {
//         getAllPosts();
//     }, []);

//     const handleLikePost = async (id) => {
//         try {
//             await axios.put(`http://localhost:4000/api/posts/addlike/${id}`, {}, config);
//             getAllPosts();
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleComment = async (id) => {
//         setCurrentPostId(id);
//         setIsModalOpen(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${id}/getallcomments`, config);
//             const allComments = response.data;
//             setComments(prevComments => ({
//                 ...prevComments,
//                 [id]: allComments,
//             }));
//         } catch (error) {
//             toast({
//                 title: error.response.data.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddComment = async () => {
//         setLoadingComment(true);
//         if (!newComment.trim()) {
//             toast({
//                 title: "Add some comment text first",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//             return;
//         }

//         try {
//             await axios.post(`http://localhost:4000/api/comments/addcomment`, { postId: currentPostId, text: newComment }, config);
//             toast({
//                 title: "Comment added successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             handleComment(currentPostId);
//             setNewComment('');
//             setLoadingComment(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     const calculateTimeDifference = (updatedAt) => {
//         const now = new Date();
//         const updatedTime = new Date(updatedAt);
//         const diffInSeconds = Math.floor((now - updatedTime) / 1000);
//         const diffInMinutes = Math.floor(diffInSeconds / 60);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds}s`;
//         } else if (diffInMinutes < 60) {
//             return `${diffInMinutes}m`;
//         } else if (diffInMinutes < 1440) { // 60 * 24
//             return `${Math.floor(diffInMinutes / 60)}h`;
//         } else if (diffInMinutes < 10080) { // 60 * 24 * 7
//             return `${Math.floor(diffInMinutes / 1440)}d`;
//         } else {
//             return `${Math.floor(diffInMinutes / 10080)}w`;
//         }
//     };

//     return (
//         <>
//             <div className='flex'>
//                 {/* Left Section for Navigation */}
//                 <SideBar/>

//                 {/* Right Section for Posts */}
//                 <div className="w-4/5 p-8 ml-[20%] flex items-center justify-center">
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-7/12 justify-center items-center">
//                         {loadingPost ? (
//                             <Spinner animation="border" />
//                         ) : (
//                             posts.map((post) => (
//                                 <div key={post._id} className="bg-white p-4 rounded-md shadow-md">
//                                     <div className="flex items-center mb-2">
//                                         <img src={generateUserImgUrl(post.user.username)} alt="User" className="h-8 w-8 rounded-full mr-2" />
//                                         <span className="text-sm font-medium">{post.user.username}</span>
//                                         <span className="ml-2 text-xs text-gray-500">{calculateTimeDifference(post.createdAt)}</span>
//                                     </div>
//                                     <div className="mb-4">
//                                         <img src={post.post} alt="Post" className="w-full rounded-md" onClick={() => handleComment(post._id)} />
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center space-x-4">
//                                             {post.likes.includes(userId) ? (
//                                                 <FcLike className="text-red-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)}  /> 
//                                             ) : (
//                                                 <FaRegHeart className="text-gray-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
//                                             )}
//                                             <FaRegComment
//                                                 className="text-gray-500 cursor-pointer"
//                                                 onClick={() => handleComment(post._id)}
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#commentModal"
//                                             />
//                                         </div>
//                                         <div className="text-xs text-gray-500">{post.likes.length} likes</div>
//                                     </div>
//                                     <hr className='mt-3'></hr>
//                                         <div className='text-xs text-gray-500 mt-3 text-left'>
//                                             {post.caption}
//                                         </div>
//                                     {/* Modal for comments */}
//                                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
//                                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
//                                             <div className="modal-content">
//                                                 <div className="modal-header">
//                                                     <h5 className="modal-title" id="commentModalLabel">Comments</h5>
//                                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsModalOpen(false); setNewComment(''); }}></button>
//                                                 </div>
//                                                 <div className="modal-body">
//                                                     {comments[currentPostId]?.length > 0 ? (
//                                                         <div className="space-y-2">
//                                                             {comments[currentPostId].map(comment => (
//                                                                 <div key={comment._id} className="flex items-start">
//                                                                     <img src={generateUserImgUrl(comment.user.username)} alt="User" className="h-6 w-6 rounded-full" />
//                                                                     <div className="ml-2">
//                                                                         <span className="font-medium">{comment.user.username}</span>
//                                                                         <p className="text-sm">{comment.text}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <p className="text-sm text-gray-500">No comments found.</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="modal-footer">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                                                         placeholder="Add a comment"
//                                                         value={newComment}
//                                                         onChange={(e) => setNewComment(e.target.value)}
//                                                     />
//                                                     <button
//                                                         className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
//                                                         onClick={handleAddComment}
//                                                         disabled={loadingComment}
//                                                     >
//                                                         {loadingComment ? <Spinner animation="border" size="sm" /> : 'Add Comment'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default HomePage;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {useNavigate } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment } from 'react-icons/fa';
// import { FcLike } from 'react-icons/fc';
// import SideBar from '../components/general/sideBar';


// const HomePage = () => {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState({});
//     const [loadingPost, setLoadingPost] = useState(false);
//     const [loadingComment, setLoadingComment] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [newComment, setNewComment] = useState('');
//     const [currentPostId, setCurrentPostId] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();

//     const toast = useToast();

//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     const getAllPosts = async () => {
//         setLoadingPost(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/posts', config);
//             const { userId, posts } = response.data;
//             setUserId(userId || '');
//             setPosts(posts);
//             setLoadingPost(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingPost(false);
//         }
//     };

//     useEffect(() => {
//         getAllPosts();
//     }, []);

//     const handleLikePost = async (id) => {
//         if (!token) {
//             toast({
//                 title: "You need to login to like posts.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:4000/api/posts/addlike/${id}`, {}, config);
//             getAllPosts();
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleComment = async (id) => {
//         if (!token) {
//             toast({
//                 title: "You need to login to comment on posts.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         setCurrentPostId(id);
//         setIsModalOpen(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${id}/getallcomments`, config);
//             const allComments = response.data;
//             setComments(prevComments => ({
//                 ...prevComments,
//                 [id]: allComments,
//             }));
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddComment = async () => {
//         if (!token) {
//             toast({
//                 title: "You need to login to add comments.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         setLoadingComment(true);
//         if (!newComment.trim()) {
//             toast({
//                 title: "Add some comment text first",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//             return;
//         }

//         try {
//             await axios.post(`http://localhost:4000/api/comments/addcomment`, { postId: currentPostId, text: newComment }, config);
//             toast({
//                 title: "Comment added successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             handleComment(currentPostId);
//             setNewComment('');
//             setLoadingComment(false);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     const calculateTimeDifference = (updatedAt) => {
//         const now = new Date();
//         const updatedTime = new Date(updatedAt);
//         const diffInSeconds = Math.floor((now - updatedTime) / 1000);
//         const diffInMinutes = Math.floor(diffInSeconds / 60);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds}s`;
//         } else if (diffInMinutes < 60) {
//             return `${diffInMinutes}m`;
//         } else if (diffInMinutes < 1440) { // 60 * 24
//             return `${Math.floor(diffInMinutes / 60)}h`;
//         } else if (diffInMinutes < 10080) { // 60 * 24 * 7
//             return `${Math.floor(diffInMinutes / 1440)}d`;
//         } else {
//             return `${Math.floor(diffInMinutes / 10080)}w`;
//         }
//     };

//     return (
//         <>
//             <div className='flex'>
//                 {/* Left Section for Navigation */}
//                 <SideBar/>

//                 {/* Right Section for Posts */}
//                 <div className="w-4/5 p-8 ml-[20%] mt-16 flex items-center justify-center">
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-7/12 justify-center items-center">
//                         {loadingPost ? (
//                             <Spinner style={{"alignItems":"center","justifyContent":"center"}} animation="border" />
//                         ) : (
//                             posts.map((post) => (
//                                 <div key={post._id} className="bg-white p-4 rounded-md shadow-md">
//                                     <div className="flex items-center mb-2">
//                                         <img src={generateUserImgUrl(post.user.username)} alt="User" className="h-8 w-8 rounded-full mr-2" />
//                                         <span className="text-sm font-medium">{post.user.username}</span>
//                                         <span className="ml-2 text-xs text-gray-500">{calculateTimeDifference(post.createdAt)}</span>
//                                     </div>
//                                     <div className="mb-4">
//                                         <img src={post.post} alt="Post" className="w-full rounded-md" onClick={() => handleComment(post._id)} />
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center space-x-4">
//                                             {post.likes.includes(userId) ? (
//                                                 <FcLike className="text-red-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)}  /> 
//                                             ) : (
//                                                 <FaRegHeart className="text-gray-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
//                                             )}
//                                             <FaRegComment
//                                                 className="text-gray-500 cursor-pointer"
//                                                 onClick={() => handleComment(post._id)}
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#commentModal"
//                                             />
//                                         </div>
//                                         <div className="text-xs text-gray-500">{post.likes.length} likes</div>
//                                     </div>
//                                     <hr className='mt-3'></hr>
//                                     <div className='text-xs text-gray-500 mt-3 text-left'>
//                                         {post.caption}
//                                     </div>
//                                     {/* Modal for comments */}
//                                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
//                                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
//                                             <div className="modal-content">
//                                                 <div className="modal-header">
//                                                     <h5 className="modal-title" id="commentModalLabel">Comments</h5>
//                                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsModalOpen(false); setNewComment(''); }}></button>
//                                                 </div>
//                                                 <div className="modal-body">
//                                                     {comments[currentPostId]?.length > 0 ? (
//                                                         <div className="space-y-2">
//                                                             {comments[currentPostId].map(comment => (
//                                                                 <div key={comment._id} className="flex items-start">
//                                                                     <img src={generateUserImgUrl(comment.user.username)} alt="User" className="h-6 w-6 rounded-full" />
//                                                                     <div className="ml-2">
//                                                                         <span className="font-medium">{comment.user.username}</span>
//                                                                         <p className="text-sm">{comment.text}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <p className="text-sm text-gray-500">No comments found.</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="modal-footer">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                                                         placeholder="Add a comment"
//                                                         value={newComment}
//                                                         onChange={(e) => setNewComment(e.target.value)}
//                                                     />
//                                                     <button
//                                                         className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
//                                                         onClick={handleAddComment}
//                                                         disabled={loadingComment}
//                                                     >
//                                                         {loadingComment ? <Spinner animation="border" size="sm" /> : 'Add Comment'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default HomePage;























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment } from 'react-icons/fa';
// import { FcLike } from 'react-icons/fc';
// import SideBar from '../components/general/sideBar';

// const HomePage = () => {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState({});
//     const [loadingPost, setLoadingPost] = useState(false);
//     const [loadingComment, setLoadingComment] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [newComment, setNewComment] = useState('');
//     const [currentPostId, setCurrentPostId] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();
//     const toast = useToast();

//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     // const getAllPosts = async () => {
//     //     setLoadingPost(true);
//     //         try {
//     //             const response = await axios.get('http://localhost:4000/api/posts/posts', config);
//     //             const { userId, posts } = response.data;
//     //             setUserId(userId || '');
//     //             setPosts(posts);
//     //         } catch (error) {
//     //             toast({
//     //                 title: error.response?.data?.message || "Error Occurred!",
//     //                 status: 'error',
//     //                 duration: 5000,
//     //                 isClosable: true,
//     //                 position: 'top',
//     //             });
//     //         } finally {
//     //             setLoadingPost(false);
//     //         }
//     // };

//     const getAllPosts = async () => {
//         setLoadingPost(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/posts', config);
//             const { userId, posts } = response.data;
//             if (userId) {
//                 setUserId(userId);
//             }
//             setPosts(posts);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } finally {
//             setLoadingPost(false);
//         }
//     };
    
//     useEffect(() => {
//         getAllPosts();
//     }, []);
    


//     const getAllPostsWithotLogin = async () => {
//         setLoadingPost(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/posts');
//             const { posts } = response.data;
//             setPosts(posts);
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } finally {
//             setLoadingPost(false);
//         }
//     };
    
    

//     const handleLikePost = async (id) => {
//         if (!token) {
//             toast({
//                 title: "You need to login to like posts.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:4000/api/posts/addlike/${id}`, {}, config);
//             getAllPosts();
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleComment = async (id) => {
//         if (!token) {
//             toast({
//                 title: "You need to login to comment on posts.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         setCurrentPostId(id);
//         setIsModalOpen(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${id}/getallcomments`, config);
//             const allComments = response.data;
//             setComments(prevComments => ({
//                 ...prevComments,
//                 [id]: allComments,
//             }));
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         }
//     };

//     const handleAddComment = async () => {
//         if (!token) {
//             toast({
//                 title: "You need to login to add comments.",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             navigate('/login');
//             return;
//         }

//         setLoadingComment(true);
//         if (!newComment.trim()) {
//             toast({
//                 title: "Add some comment text first",
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             setLoadingComment(false);
//             return;
//         }

//         try {
//             await axios.post('http://localhost:4000/api/comments/addcomment', { postId: currentPostId, text: newComment }, config);
//             toast({
//                 title: "Comment added successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             handleComment(currentPostId);
//             setNewComment('');
//         } catch (error) {
//             toast({
//                 title: error.response?.data?.message || "Error Occurred!",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//         } finally {
//             setLoadingComment(false);
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     const calculateTimeDifference = (updatedAt) => {
//         const now = new Date();
//         const updatedTime = new Date(updatedAt);
//         const diffInSeconds = Math.floor((now - updatedTime) / 1000);
//         const diffInMinutes = Math.floor(diffInSeconds / 60);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds}s`;
//         } else if (diffInMinutes < 60) {
//             return `${diffInMinutes}m`;
//         } else if (diffInMinutes < 1440) { // 60 * 24
//             return `${Math.floor(diffInMinutes / 60)}h`;
//         } else if (diffInMinutes < 10080) { // 60 * 24 * 7
//             return `${Math.floor(diffInMinutes / 1440)}d`;
//         } else {
//             return `${Math.floor(diffInMinutes / 10080)}w`;
//         }
//     };

//     return (
//         <>
//             <div className='flex'>
//                 {/* Left Section for Navigation */}
//                 <SideBar />

//                 {/* Right Section for Posts */}
//                 <div className="w-4/5 p-8 ml-[20%] mt-16 flex items-center justify-center">
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-7/12 justify-center items-center">
//                         {loadingPost ? (
//                             <Spinner style={{ alignItems: "center", justifyContent: "center" }} animation="border" />
//                         ) : (
//                             posts.map((post) => (
//                                 <div key={post._id} className="bg-white p-4 rounded-md shadow-md">
//                                     <div className="flex items-center mb-2">
//                                         <img src={generateUserImgUrl(post.user.username)} alt="User" className="h-8 w-8 rounded-full mr-2" />
//                                         <span className="text-sm font-medium">{post.user.username}</span>
//                                         <span className="ml-2 text-xs text-gray-500">{calculateTimeDifference(post.createdAt)}</span>
//                                     </div>
//                                     <div className="mb-4">
//                                         <img src={post.post} alt="Post" className="w-full rounded-md" onClick={() => handleComment(post._id)} />
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center space-x-4">
//                                             {post.likes.includes(userId) ? (
//                                                 <FcLike className="text-red-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
//                                             ) : (
//                                                 <FaRegHeart className="text-gray-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
//                                             )}
//                                             <FaRegComment
//                                                 className="text-gray-500 cursor-pointer"
//                                                 onClick={() => handleComment(post._id)}
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#commentModal"
//                                             />
//                                         </div>
//                                         <div className="text-xs text-gray-500">{post.likes.length} likes</div>
//                                     </div>
//                                     <hr className='mt-3'></hr>
//                                     <div className='text-xs text-gray-500 mt-3 text-left'>
//                                         {post.caption}
//                                     </div>
//                                     {/* Modal for comments */}
//                                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
//                                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                                             <div className="modal-content">
//                                                 <div className="modal-header">
//                                                     <h5 className="modal-title" id="commentModalLabel">Comments</h5>
//                                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsModalOpen(false); setNewComment(''); }}></button>
//                                                 </div>
//                                                 <div className="modal-body">
//                                                     {comments[currentPostId]?.length > 0 ? (
//                                                         <div className="space-y-2">
//                                                             {comments[currentPostId].map(comment => (
//                                                                 <div key={comment._id} className="flex items-start">
//                                                                     <img src={generateUserImgUrl(comment.user.username)} alt="User" className="h-6 w-6 rounded-full" />
//                                                                     <div className="ml-2">
//                                                                         <span className="font-medium">{comment.user.username}</span>
//                                                                         <p className="text-sm">{comment.text}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <p className="text-sm text-gray-500">No comments found.</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="modal-footer">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                                                         placeholder="Add a comment"
//                                                         value={newComment}
//                                                         onChange={(e) => setNewComment(e.target.value)}
//                                                     />
//                                                     <button
//                                                         className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
//                                                         onClick={handleAddComment}
//                                                         disabled={loadingComment}
//                                                     >
//                                                         {loadingComment ? <Spinner animation="border" size="sm" /> : 'Add Comment'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default HomePage;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
import { useToast } from '@chakra-ui/react';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import SideBar from '../components/general/sideBar';
import LoadingComponent from '../components/general/loding';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [loadingPost, setLoadingPost] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [userId, setUserId] = useState('');
    const [newComment, setNewComment] = useState('');
    const [currentPostId, setCurrentPostId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const token = localStorage.getItem('token');
    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
    } : {};

    const getAllPosts = async () => {
        setLoadingPost(true);
        try {
            const response = await axios.get('http://localhost:4000/api/posts/posts', config);
            const { userId, posts } = response.data;
            if (userId) {
                setUserId(userId);
            }
            setPosts(posts);
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error Occurred!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setLoadingPost(false);
        }
    };

    const getAllPostsWithoutLogin = async () => {
        setLoadingPost(true);
        try {
            const response = await axios.get('http://localhost:4000/api/posts/posts/withoulogin',config);
            const { posts } = response.data;
            setPosts(posts);
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error Occurred!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setLoadingPost(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAllPosts();
        } else {
            getAllPostsWithoutLogin();
        }
    }, [token]);

    const handleLikePost = async (id) => {
        if (!token) {
            toast({
                title: "You need to login to like posts.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            navigate('/login');
            return;
        }

        try {
            await axios.put(`http://localhost:4000/api/posts/addlike/${id}`, {}, config);
            getAllPosts();
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error Occurred!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleComment = async (id) => {
        if (!token) {
            toast({
                title: "You need to login to comment on posts.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            navigate('/login');
            return;
        }

        setCurrentPostId(id);
        setIsModalOpen(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/comments/${id}/getallcomments`, config);
            const allComments = response.data;
            setComments(prevComments => ({
                ...prevComments,
                [id]: allComments,
            }));
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error Occurred!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleAddComment = async () => {
        if (!token) {
            toast({
                title: "You need to login to add comments.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            navigate('/login');
            return;
        }

        setLoadingComment(true);
        if (!newComment.trim()) {
            toast({
                title: "Add some comment text first",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoadingComment(false);
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/comments/addcomment', { postId: currentPostId, text: newComment }, config);
            toast({
                title: "Comment added successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            handleComment(currentPostId);
            setNewComment('');
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error Occurred!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setLoadingComment(false);
        }
    };

    const generateUserImgUrl = (firstName) => {
        return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
    };

    const calculateTimeDifference = (updatedAt) => {
        const now = new Date();
        const updatedTime = new Date(updatedAt);
        const diffInSeconds = Math.floor((now - updatedTime) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m`;
        } else if (diffInMinutes < 1440) { // 60 * 24
            return `${Math.floor(diffInMinutes / 60)}h`;
        } else if (diffInMinutes < 10080) { // 60 * 24 * 7
            return `${Math.floor(diffInMinutes / 1440)}d`;
        } else {
            return `${Math.floor(diffInMinutes / 10080)}w`;
        }
    };

    return (
        <>
            <div className='flex bg-black'>
                {/* Left Section for Navigation */}
                <SideBar />

                {/* Right Section for Posts */}
                <div className="w-4/5 p-8 ml-[20%] mt-16 flex items-center justify-center min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-7/12 justify-center items-center">
                        {loadingPost ? (
                            // <Spinner style={{ alignItems: "center", justifyContent: "center",size:"16rem" }} animation="border" />
                            <div className=' flex flex-col gap-6'>
                                <LoadingComponent/>
                                <LoadingComponent/>
                                <LoadingComponent/>
                                <LoadingComponent/>
                                <LoadingComponent/>

                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post._id} className="bg-white p-4 rounded-md shadow-md">
                                    <div className="flex items-center mb-2">
                                        <img src={generateUserImgUrl(post.user.username)} alt="User" className="h-8 w-8 rounded-full mr-2" />
                                        <span className="text-sm font-medium">{post.user.username}</span>
                                        <span className="ml-2 text-xs text-gray-500">{calculateTimeDifference(post.createdAt)}</span>
                                    </div>
                                    <div className="mb-4">
                                        <img src={post.post} alt="Post" className="w-full rounded-md" onClick={() => handleComment(post._id)} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            {post.likes.includes(userId) ? (
                                                <FcLike className="text-red-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
                                            ) : (
                                                <FaRegHeart className="text-gray-500 cursor-pointer" style={{ fontSize: '23px' }} onClick={() => handleLikePost(post._id)} />
                                            )}
                                            <FaRegComment
                                                className="text-gray-500 cursor-pointer"
                                                onClick={() => handleComment(post._id)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#commentModal"
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500">{post.likes.length} likes</div>
                                    </div>
                                    <hr className='mt-3'></hr>
                                    <div className='text-xs text-gray-500 mt-3 text-left'>
                                        {post.caption}
                                    </div>
                                    {/* Modal for comments */}
                                    <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="commentModalLabel">Comments</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsModalOpen(false); setNewComment(''); }}></button>
                                                </div>
                                                <div className="modal-body">
                                                    {comments[currentPostId]?.length > 0 ? (
                                                        <div className="space-y-2">
                                                            {comments[currentPostId].map(comment => (
                                                                <div key={comment._id} className="flex items-start">
                                                                    <img src={generateUserImgUrl(comment.user.username)} alt="User" className="h-6 w-6 rounded-full" />
                                                                    <div className="ml-2">
                                                                        <span className="font-medium">{comment.user.username}</span>
                                                                        <p className="text-sm">{comment.text}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">No comments found.</p>
                                                    )}
                                                </div>
                                                <div className="modal-footer">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                                        placeholder="Add a comment"
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                    />
                                                    <button
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
                                                        onClick={handleAddComment}
                                                        disabled={loadingComment}
                                                    >
                                                        {loadingComment ? <Spinner animation="border" size="sm" /> : 'Add Comment'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
