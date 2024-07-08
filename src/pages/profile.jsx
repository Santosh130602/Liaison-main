// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// // import { useToast } from '@chakra-ui/react';
// // import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// // import SideBar from '../components/general/sideBar';
// // import {jwtDecode} from "jwt-decode"; // Fixed import statement


// // const ProfilePage = () => {
// //     const [user, setUser] = useState({});
// //     const [posts, setPosts] = useState([]);
// //     const [loadingProfile, setLoadingProfile] = useState(false);
// //     const [loadingPosts, setLoadingPosts] = useState(false);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [selectedPost, setSelectedPost] = useState(null);
// //     // const [username, setUsername] = useState("");


// //     const toast = useToast();
// //     const token = localStorage.getItem('token');
// //     const decodedToken = jwtDecode(token);
// //     // setUsername(decodedToken.username); 
// //     const username = decodedToken.username;

// //     const config = token ? {
// //         headers: {
// //             'Authorization': `Bearer ${token}`,
// //             "Content-type": "application/json",
// //         },
// //     } : {};

// //     useEffect(() => {
// //         fetchUserProfile();
// //         fetchUserPosts();
// //     }, []);

// //     const fetchUserProfile = async () => {
// //         setLoadingProfile(true);
// //         try {
// //             const response = await axios.get('http://localhost:4000/api/user/profile', config);
// //             setUser(response.data.user);
// //             setLoadingProfile(false);
// //         } catch (error) {
// //             toast({
// //                 title: error.response?.data?.message || "Error fetching profile!",
// //                 status: 'error',
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: 'top',
// //             });
// //             setLoadingProfile(false);
// //         }
// //     };

// //     const fetchUserPosts = async () => {
// //         setLoadingPosts(true);
// //         try {
// //             const response = await axios.get('http://localhost:4000/api/posts/myposts', config);
// //             setPosts(response.data.posts);
// //             setLoadingPosts(false);
// //         } catch (error) {
// //             toast({
// //                 title: error.response?.data?.message || "Error fetching posts!",
// //                 status: 'error',
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: 'top',
// //             });
// //             setLoadingPosts(false);
// //         }
// //     };

// //     const handleDeletePost = async (postId) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/api/posts/deletepost/${postId}`, config);
// //             toast({
// //                 title: "Post deleted successfully",
// //                 status: 'success',
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: 'top',
// //             });
// //             fetchUserPosts();
// //             setIsModalOpen(false);
// //         } catch (error) {
// //             toast({
// //                 title: error.response?.data?.message || "Error deleting post!",
// //                 status: 'error',
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: 'top',
// //             });
// //         }
// //     };

// //     const openPostModal = (postId) => {
// //         setSelectedPost(postId);
// //         setIsModalOpen(true);
// //     };

// //     const closeModal = () => {
// //         setIsModalOpen(false);
// //     };

// //     const generateUserImgUrl = (firstName) => {
// //         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
// //       };


// //     return (
// //         <div className='flex'>
// //             {/* Left Section for Navigation */}
// //             <SideBar />

// //             {/* Right Section for Profile */}
// //             <div className="w-4/5 p-8 ml-[20%] mt-16">
// //                 {/* Profile Info */}
// //                 {loadingProfile ? (
// //                     <Spinner animation="border" />
// //                 ) : (
// //                     <div className="flex items-center mb-8">
// //                         <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
// //                         <div>
// //                             <h2 className="text-xl font-semibold">{username}</h2>
// //                             <p className="text-gray-500">{user.email}</p>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* User Posts */}
// //                 {loadingPosts ? (
// //                     <Spinner animation="border" />
// //                 ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// //                         {posts.map(post => (
// //                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
// //                                 <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
// //                                 <div className="absolute top-2 right-2">
// //                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}

// //                 {/* Modal for Post Details */}
// //                 {selectedPost && (
// //                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
// //                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
// //                             <div className="modal-content">
// //                                 <div className="modal-header">
// //                                     <h5 className="modal-title" id="postModalLabel">Post Details</h5>
// //                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
// //                                 </div>
// //                                 <div className="modal-body">
// //                                     {/* Display post details here */}
// //                                     {/* Example: <img src={postDetails.imageUrl} alt="Post Image" /> */}
// //                                     <img src={selectedPost.post} alt="Post Image" />
// //                                     {/* Include other post details and actions like comments, likes, etc. */}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// import SideBar from '../components/general/sideBar';
// import { jwtDecode } from "jwt-decode"; // Fixed import statement

// const ProfilePage = () => {
//     const [user, setUser] = useState({});
//     const [posts, setPosts] = useState([]);
//     const [loadingProfile, setLoadingProfile] = useState(false);
//     const [loadingPosts, setLoadingPosts] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState('');

//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     const username = decodedToken.username;

//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchUserProfile();
//         fetchUserPosts();
//     }, []);

//     const fetchUserProfile = async () => {
//         setLoadingProfile(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/user/profile', config);
//             setUser(response.data.user);
//             setLoadingProfile(false);
//         } catch (error) {
//             handleFetchError(error, 'profile');
//         }
//     };

//     const fetchUserPosts = async () => {
//         setLoadingPosts(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/myposts', config);
//             setPosts(response.data.posts);
//             setLoadingPosts(false);
//         } catch (error) {
//             handleFetchError(error, 'posts');
//         }
//     };

//     const handleFetchError = (error, type) => {
//         const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//         toast({
//             title: errorMessage,
//             status: 'error',
//             duration: 5000,
//             isClosable: true,
//             position: 'top',
//         });
//         setLoadingProfile(false);
//         setLoadingPosts(false);
//     };

//     const handleDeletePost = async (postId) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/posts/deletepost/${postId}`, config);
//             toast({
//                 title: "Post deleted successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             fetchUserPosts();
//             closeModal();
//         } catch (error) {
//             handleFetchError(error, 'post deletion');
//         }
//     };

//     const openPostModal = (postId) => {
//         setSelectedPost(posts.find(post => post._id === postId));
//         setIsModalOpen(true);
//         fetchComments(postId);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//         setComments([]);
//     };

//     const fetchComments = async (postId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${postId}`, config);
//             setComments(response.data.comments);
//         } catch (error) {
//             handleFetchError(error, 'comments');
//         }
//     };

//     const handleAddComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
//             setComments([...comments, response.data.comment]);
//             setCommentText('');
//         } catch (error) {
//             handleFetchError(error, 'comment addition');
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     return (
//         <div className='flex'>
//             {/* Left Section for Navigation */}
//             <SideBar />

//             {/* Right Section for Profile */}
//             <div className="w-4/5 p-8 ml-[20%] mt-16">
//                 {/* Profile Info */}
//                 {loadingProfile ? (
//                     <Spinner animation="border" />
//                 ) : (
//                     <div className="flex items-center mb-8">
//                         <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
//                         <div>
//                             <h2 className="text-xl font-semibold">{username}</h2>
//                             <p className="text-gray-500">{user.email}</p>
//                         </div>
//                     </div>
//                 )}

//                 {/* User Posts */}
//                 {loadingPosts ? (
//                     <Spinner animation="border" />
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//                         {posts.map(post => (
//                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
//                                 <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
//                                 <div className="absolute top-2 right-2">
//                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Modal for Post Details */}
//                 {selectedPost && (
//                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
//                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable max-w-4xl">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title" id="postModalLabel">Post Details</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
//                                 </div>

//                                 <div className='flex w-[600px] gap-6'>
//                                 <div className="modal-body">
//                                     <img src={selectedPost.post} alt="Post Image" className="w-full mb-4 rounded-md cursor-pointer" onClick={() => openPostModal(selectedPost._id)} />
//                                     <div className="flex items-center mb-4">
//                                         <FaRegHeart className="mr-2 cursor-pointer" />
//                                         <FaRegComment className="mr-2 cursor-pointer" />
//                                         <span>{selectedPost.likes.length} Likes</span>
//                                     </div>
//                                 </div>


//                                  <div className='justify-center items-center'>   
//                                     <div  className='justify-center items-center'>
//                                         <h4 className="font-semibold mb-2">Comments</h4>
//                                         {comments.length === 0 && <p>No comments yet.</p>}
//                                         {comments.map(comment => (
//                                             <div key={comment._id} className="bg-gray-100 p-2 mb-2 rounded-md">
//                                                 <p>{comment.text}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className="mt-4">
//                                         <textarea
//                                             className="w-full p-2 border rounded-md"
//                                             placeholder="Add a comment..."
//                                             value={commentText}
//                                             onChange={(e) => setCommentText(e.target.value)}
//                                         />
//                                         <button
//                                             className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
//                                             onClick={handleAddComment}
//                                         >
//                                             Add Comment
//                                         </button>
//                                     </div>
//                                 </div>

//                                 </div>
                                
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;













// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// // import { useToast } from '@chakra-ui/react';
// // import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// // import SideBar from '../components/general/sideBar';
// // import { jwtDecode } from "jwt-decode"; // Fixed import statement

// // const ProfilePage = () => {
// //     const [user, setUser] = useState({});
// //     const [posts, setPosts] = useState([]);
// //     const [loadingProfile, setLoadingProfile] = useState(false);
// //     const [loadingPosts, setLoadingPosts] = useState(false);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [selectedPost, setSelectedPost] = useState(null);
// //     const [comments, setComments] = useState([]);
// //     const [commentText, setCommentText] = useState('');

// //     const toast = useToast();
// //     const token = localStorage.getItem('token');
// //     const decodedToken = jwtDecode(token);
// //     const username = decodedToken.username;

// //     const config = token ? {
// //         headers: {
// //             'Authorization': `Bearer ${token}`,
// //             "Content-type": "application/json",
// //         },
// //     } : {};

// //     useEffect(() => {
// //         fetchUserProfile();
// //         fetchUserPosts();
// //     }, []);

// //     const fetchUserProfile = async () => {
// //         setLoadingProfile(true);
// //         try {
// //             const response = await axios.get('http://localhost:4000/api/user/profile', config);
// //             setUser(response.data.user);
// //             setLoadingProfile(false);
// //         } catch (error) {
// //             handleFetchError(error, 'profile');
// //         }
// //     };

// //     const fetchUserPosts = async () => {
// //         setLoadingPosts(true);
// //         try {
// //             const response = await axios.get('http://localhost:4000/api/posts/myposts', config);
// //             setPosts(response.data.posts);
// //             setLoadingPosts(false);
// //         } catch (error) {
// //             handleFetchError(error, 'posts');
// //         }
// //     };

// //     const handleFetchError = (error, type) => {
// //         const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
// //         toast({
// //             title: errorMessage,
// //             status: 'error',
// //             duration: 5000,
// //             isClosable: true,
// //             position: 'top',
// //         });
// //         setLoadingProfile(false);
// //         setLoadingPosts(false);
// //     };

// //     const handleDeletePost = async (postId) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/api/posts/deletepost/${postId}`, config);
// //             toast({
// //                 title: "Post deleted successfully",
// //                 status: 'success',
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: 'top',
// //             });
// //             fetchUserPosts();
// //             closeModal();
// //         } catch (error) {
// //             handleFetchError(error, 'post deletion');
// //         }
// //     };

// //     const openPostModal = (postId) => {
// //         const post = posts.find(post => post._id === postId);
// //         setSelectedPost(post);
// //         setIsModalOpen(true);
// //         fetchComments(postId);
// //     };

// //     const closeModal = () => {
// //         setIsModalOpen(false);
// //         setSelectedPost(null);
// //         setComments([]);
// //     };

// //     const fetchComments = async (postId) => {
// //         try {
// //             const response = await axios.get(`http://localhost:4000/api/comments/${postId}/getallcomments`, config);  
// //             setComments(response.data.comments);
// //         } catch (error) {
// //             handleFetchError(error, 'comments');
// //         }
// //     };

// //     const handleAddComment = async () => {
// //         try {
// //             const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
// //             setComments([...comments, response.data.comment]);
// //             setCommentText('');
// //         } catch (error) {
// //             handleFetchError(error, 'comment addition');
// //         }
// //     };

// //     const generateUserImgUrl = (firstName) => {
// //         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
// //     };

// //     return (
// //         <div className='flex'>
// //             {/* Left Section for Navigation */}
// //             <SideBar />

// //             {/* Right Section for Profile */}
// //             <div className="w-4/5 p-8 ml-[20%] mt-16">
// //                 {/* Profile Info */}
// //                 {loadingProfile ? (
// //                     <Spinner animation="border" />
// //                 ) : (
// //                     <div className="flex items-center mb-8">
// //                         <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
// //                         <div>
// //                             <h2 className="text-xl font-semibold">{username}</h2>
// //                             <p className="text-gray-500">{user.email}</p>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* User Posts */}
// //                 {loadingPosts ? (
// //                     <Spinner animation="border" />
// //                 ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// //                         {posts.map(post => (
// //                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
// //                                 <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
// //                                 <div className="absolute top-2 right-2">
// //                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}

// //                 {/* Modal for Post Details */}
// //                 {selectedPost && (
// //                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
// //                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable max-w-4xl">
// //                             <div className="modal-content">
// //                                 <div className="modal-header">
// //                                     <h5 className="modal-title" id="postModalLabel">Post Details</h5>
// //                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
// //                                 </div>
// //                                 <div className="modal-body">
// //                                     <img src={selectedPost.post} alt="Post Image" className="w-full mb-4 rounded-md cursor-pointer" onClick={() => openPostModal(selectedPost._id)} />
// //                                     <div className="flex items-center mb-4">
// //                                         <FaRegHeart className="mr-2 cursor-pointer" />
// //                                         <FaRegComment className="mr-2 cursor-pointer" />
// //                                         <span>{selectedPost.likes.length} Likes</span>
// //                                     </div>
// //                                     <div>
// //                                         <h4 className="font-semibold mb-2">Comments</h4>
// //                                         {comments.length === 0 && <p>No comments yet.</p>}
// //                                         {comments.map(comment => (
// //                                             <div key={comment._id} className="bg-gray-100 p-2 mb-2 rounded-md">
// //                                                 <p>{comment.text}</p>
// //                                             </div>
// //                                         ))}
// //                                         <textarea
// //                                             className="w-full p-2 border rounded-md mt-4"
// //                                             placeholder="Add a comment..."
// //                                             value={commentText}
// //                                             onChange={(e) => setCommentText(e.target.value)}
// //                                         />
// //                                         <button
// //                                             className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
// //                                             onClick={handleAddComment}
// //                                         >
// //                                             Add Comment
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
// import { useToast } from '@chakra-ui/react';
// import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// import SideBar from '../components/general/sideBar';
// import {jwtDecode} from 'jwt-decode'; // Fixed import statement

// const ProfilePage = () => {
//     const [user, setUser] = useState({});
//     const [posts, setPosts] = useState([]);
//     const [loadingProfile, setLoadingProfile] = useState(false);
//     const [loadingPosts, setLoadingPosts] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState('');
//     const [friends, setFriends] = useState([]); // New state for friends

//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     const username = decodedToken.username;

//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchUserProfile();
//         fetchUserPosts();
//         fetchUserFriends(); // Fetch friends
//     }, []);

//     const fetchUserProfile = async () => {
//         setLoadingProfile(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/user/profile', config);
//             setUser(response.data.user);
//             setLoadingProfile(false);
//         } catch (error) {
//             handleFetchError(error, 'profile');
//         }
//     };

//     const fetchUserPosts = async () => {
//         setLoadingPosts(true);
//         try {
//             const response = await axios.get('http://localhost:4000/api/posts/myposts', config);
//             setPosts(response.data.posts);
//             setLoadingPosts(false);
//         } catch (error) {
//             handleFetchError(error, 'posts');
//         }
//     };

//     const fetchUserFriends = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/usersearch/userfriend', config);
//             setFriends(response.data.friends);
//         } catch (error) {
//             handleFetchError(error, 'friends');
//         }
//     };

//     const handleFetchError = (error, type) => {
//         const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
//         toast({
//             title: errorMessage,
//             status: 'error',
//             duration: 5000,
//             isClosable: true,
//             position: 'top',
//         });
//         setLoadingProfile(false);
//         setLoadingPosts(false);
//     };

//     const handleDeletePost = async (postId) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/posts/deletepost/${postId}`, config);
//             toast({
//                 title: "Post deleted successfully",
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'top',
//             });
//             fetchUserPosts();
//             closeModal();
//         } catch (error) {
//             handleFetchError(error, 'post deletion');
//         }
//     };

//     const openPostModal = (postId) => {
//         setSelectedPost(posts.find(post => post._id === postId));
//         setIsModalOpen(true);
//         fetchComments(postId);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//         setComments([]);
//     };

//     const fetchComments = async (postId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/comments/${postId}`, config);
//             setComments(response.data.comments);
//         } catch (error) {
//             handleFetchError(error, 'comments');
//         }
//     };

//     const handleAddComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
//             setComments([...comments, response.data.comment]);
//             setCommentText('');
//         } catch (error) {
//             handleFetchError(error, 'comment addition');
//         }
//     };

//     const generateUserImgUrl = (firstName) => {
//         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
//     };

//     return (
//         <div className='flex'>
//             {/* Left Section for Navigation */}
//             <SideBar />

//             {/* Right Section for Profile */}
//             <div className="w-4/5 p-8 ml-[20%] mt-16">
//                 {/* Profile Info */}
//                 {loadingProfile ? (
//                     <Spinner animation="border" />
//                 ) : (
//                     <div className="flex items-center mb-8">
//                         <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
//                         <div>
//                             <h2 className="text-xl font-semibold">{username}</h2>
//                             <p className="text-gray-500">{user.email}</p>
//                         </div>
//                     </div>
//                 )}

//                 {/* User Posts */}
//                 {loadingPosts ? (
//                     <Spinner animation="border" />
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//                         {posts.map(post => (
//                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
//                                 <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
//                                 <div className="absolute top-2 right-2">
//                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Friends List */}
//                 <div className="mt-8">
//                     <h3 className="text-xl font-semibold mb-4">Friends</h3>
//                     {friends.length === 0 ? (
//                         <p>No friends yet.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {friends.map(friend => (
//                                 <div key={friend._id} className="bg-gray-100 p-4 rounded-md shadow-md">
//                                     <img src={generateUserImgUrl(friend.username)} alt="Friend Avatar" className="h-16 w-16 rounded-full mb-2" />
//                                     <h4 className="text-lg font-semibold">{friend.username}</h4>
//                                     <p className="text-gray-500">{friend.email}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Modal for Post Details */}
//                 {selectedPost && (
//                     <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
//                         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable max-w-4xl">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title" id="postModalLabel">Post Details</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
//                                 </div>
//                                 <div className='flex w-[600px] gap-6'>
//                                     <div className="modal-body">
//                                         <img src={selectedPost.post} alt="Post Image" className="w-full mb-4 rounded-md cursor-pointer" onClick={() => openPostModal(selectedPost._id)} />
//                                         <div className="flex items-center mb-4">
//                                             <FaRegHeart className="mr-2 cursor-pointer" />
//                                             <FaRegComment className="mr-2 cursor-pointer" />
//                                             <span>{selectedPost.likes.length} Likes</span>
//                                         </div>
//                                     </div>

//                                     <div className='justify-center items-center'>
//                                         <div className='justify-center items-center'>
//                                             <h4 className="font-semibold mb-2">Comments</h4>
//                                             {comments.length === 0 && <p>No comments yet.</p>}
//                                             {comments.map(comment => (
//                                                 <div key={comment._id} className="bg-gray-100 p-2 mb-2 rounded-md">
//                                                     <p>{comment.text}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="mt-4">
//                                             <textarea
//                                                 className="w-full p-2 border rounded-md"
//                                                 placeholder="Add a comment..."
//                                                 value={commentText}
//                                                 onChange={(e) => setCommentText(e.target.value)}
//                                             />
//                                             <button
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
//                                                 onClick={handleAddComment}
//                                             >
//                                                 Add Comment
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
import SideBar from '../components/general/sideBar';
import {jwtDecode} from 'jwt-decode'; // Fixed import statement


const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [friends, setFriends] = useState([]); // New state for friends
    


    const toast = useToast();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;

    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
    } : {};

    useEffect(() => {
        fetchUserProfile();
        fetchUserPosts();
        fetchUserFriends(); // Fetch friends
    }, []);

    const fetchUserProfile = async () => {
        setLoadingProfile(true);
        try {
            const response = await axios.get('http://localhost:4000/api/user/profile', config);
            setUser(response.data.user);
        } catch (error) {
            handleFetchError(error, 'profile');
        } finally {
            setLoadingProfile(false);
        }
    };

    const fetchUserPosts = async () => {
        setLoadingPosts(true);
        try {
            const response = await axios.get('http://localhost:4000/api/posts/myposts', config);
            setPosts(response.data.posts);
        } catch (error) {
            handleFetchError(error, 'posts');
        } finally {
            setLoadingPosts(false);
        }
    };

    const fetchUserFriends = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/usersearch/userfriend', config);
            setFriends(response.data.friends);
        } catch (error) {
            handleFetchError(error, 'friends');
        }
    };

    const fetchUserFriendPost = async () =>{
        setLoadingPosts(true);
        try{
            const response = await axios.get('http://localhost:4000/api/posts/myfriendposts', config);
            setPosts(response.data.posts);
        }catch(error){
            handleFetchError(error, 'posts');
        }finally{
            setLoadingPosts(false);
        }
    };

   

    const handleFetchError = (error, type) => {
        const errorMessage = error.response?.data?.message || `Error fetching ${type}!`;
        toast({
            title: errorMessage,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
        setLoadingProfile(false);
        setLoadingPosts(false);
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:4000/api/posts/deletepost/${postId}`, config);
            toast({
                title: "Post deleted successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            fetchUserPosts();
            closeModal();
        } catch (error) {
            handleFetchError(error, 'post deletion');
        }
    };

    const openPostModal = (postId) => {
        setSelectedPost(posts.find(post => post._id === postId));
        setIsModalOpen(true);
        fetchComments(postId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setComments([]);
    };

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/comments/${postId}`, config);
            setComments(response.data.comments);
        } catch (error) {
            handleFetchError(error, 'comments');
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
            // const response = await axios.get(`http://localhost:4000/api/comments/${selectedPost._id}/getallcomments`, config);

            setComments([...comments, response.data.comment]);
            setCommentText('');
        } catch (error) {
            handleFetchError(error, 'comment addition');
        }
    };

    const generateUserImgUrl = (firstName) => {
        return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
    };

    return (
        <div className='flex'>
            <SideBar />

            <div className="w-4/5 p-8 ml-[20%] mt-16">
                {loadingProfile ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex items-center mb-8">
                        <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">{username}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                )}

                {loadingPosts ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {posts.map(post => (
                            <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
                                <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
                                <div className="absolute top-2 right-2">
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Friends</h3>
                    {friends.length === 0 ? (
                        <p>No friends yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {friends.map(friend => (
                                <div key={friend._id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                    <img src={generateUserImgUrl(friend.username)} alt="Friend Avatar" className="h-16 w-16 rounded-full mb-2" onClick={fetchUserFriendPost} />
                                    <h4  className="text-lg font-semibold" onClick={fetchUserFriendPost}>{friend.username}</h4>
                                    <p className="text-gray-500" onClick={fetchUserFriendPost}>{friend.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedPost && (
                    <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable max-w-4xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="postModalLabel">Post Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                                </div>
                                <div className='flex w-[600px] gap-6'>
                                    <div className="modal-body">
                                        <img src={selectedPost.post} alt="Post Image" className="w-full mb-4 rounded-md cursor-pointer" onClick={() => openPostModal(selectedPost._id)} />
                                        <div className="flex items-center mb-4">
                                            <FaRegHeart className="mr-2 cursor-pointer" />
                                            <FaRegComment className="mr-2 cursor-pointer" />
                                            <span>{selectedPost.likes.length} Likes</span>
                                        </div>
                                    </div>

                                    <div className='justify-center items-center'>
                                    <div className='justify-center items-center'>
                                        <h4 className="font-semibold mb-2">Comments</h4>
                                        {comments.length === 0 && <p>No comments yet.</p>}
                                        {comments.map(comment => (
                                            <div key={comment._id} className="bg-gray-100 p-2 mb-2 rounded-md">
                                                <p>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <textarea
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Add a comment..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
                                            onClick={handleAddComment}
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);
};

export default ProfilePage;


