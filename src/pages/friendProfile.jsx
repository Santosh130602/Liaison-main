

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const FriendProfile = () => {
//     const { friendId, friendName } = useParams();
//     const [friendPosts, setFriendPosts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchFriendPosts();
//     }, [friendId]);

//     const fetchFriendPosts = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/posts/myfriendposts/${friendId}`, config);
//             setFriendPosts(response.data.posts);
//             console.log(response.data)
//             // console.log(friendId)

//         } catch (error) {
//             setError('Error fetching friend posts');
//             console.error('Error fetching friend posts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-semibold mb-4 mt-16">{friendName}'s Posts</h2>
//             {loading ? (
//                 <div className="flex justify-center items-center">
//                     <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//                 </div>
//             ) : error ? (
//                 <div className="text-red-500 text-center">
//                     {error}
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {friendPosts.map(post => (
//                         <div key={post._id} className="bg-white p-4 rounded-md shadow-md">
//                             <h1>{post._id} Post Id</h1>
//                             <img src={post.post} alt="Friend Post" className="w-full rounded-md cursor-pointer" />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FriendProfile;






// ****************************************************************************************************************************************




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// import SideBar from '../components/general/sideBar';
// import { useToast } from '@chakra-ui/react';
// import { IoSettingsOutline } from "react-icons/io5";
// import { AiFillMessage } from "react-icons/ai";

// const FriendProfile = () => {
//     const { friendId, friendName } = useParams();
//     const [friendPosts, setFriendPosts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState('');
//     const navigate = useNavigate();


//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchFriendPosts();
//     }, [friendId]);

//     const fetchFriendPosts = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/posts/myfriendposts/${friendId}`, config);
//             setFriendPosts(response.data.posts);
//             console.log(response.data);
//         } catch (error) {
//             setError('Error fetching friend posts');
//             console.error('Error fetching friend posts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const openPostModal = (postId) => {
//         setSelectedPost(friendPosts.find(post => post._id === postId));
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
//             console.error('Error fetching comments:', error);
//         }
//     };

//     const handleAddComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
//             setComments([...comments, response.data.comment]);
//             setCommentText('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
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
//             fetchFriendPosts();
//             closeModal();
//         } catch (error) {
//             console.error('Error deleting post:', error);
//         }
//     };
//     // const handleCommunication = (friendId, friendName) =>{
//     //     navigate(`/communication/${friendId}/${friendName}`);
//     // }
//     const handleCommunication = () => {
//         if (friend) {
//             navigate(`/communication/${friend._id}/${friend.username}`); // Navigate to communication route with friendId and friendName
//         }
//     };

//     return (
//         <div className='flex bg-black h-[100vh]'>
//             <SideBar />

//             <div className="w-4/5 p-8 ml-[20%] mt-16">
//                 <div className="flex mb-12">
//                     <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friendName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`} alt="Friend Avatar" className="h-32 w-32 rounded-full mr-4" />
//                     <div className='ml-[14rem]'>
//                         <div className='flex gap-8'>
//                             <h2 className="text-2xl cursor-pointer font-semibold text-slate-300">{friendName}</h2>
//                             {/* <button  onClick={() => handleCommunication(friend._id, friend.username)}className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'><AiFillMessage/></button> */}
//                             <button onClick={() => handleCommunication(friendId, friendName)} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'> <AiFillMessage/></button>

//                             <button  className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'> <IoSettingsOutline /> </button>

//                         </div>
//                     </div>
//                 </div>

//                 <hr className='text-gray-100 mb-12'></hr>

//                 {loading ? (
//                     <div className="flex justify-center items-center">
//                         <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//                     </div>
//                 ) : error ? (
//                     <div className="text-red-500 text-center">
//                         {error}
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//                         {friendPosts.map(post => (
//                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
//                                 <img src={post.post} alt="Friend Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
//                                 <div className="absolute top-2 right-2">
//                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
//                                 </div>
//                                 <div className="flex justify-between items-center mt-2">
//                                     <div className="flex items-center">
//                                         <FaRegHeart className="text-gray-600 cursor-pointer" />
//                                         <span className="ml-1 text-gray-600">{post.likes.length}</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <FaRegComment className="text-gray-600 cursor-pointer" />
//                                         <span className="ml-1 text-gray-600">{post.comments.length}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white w-1/2 p-6 rounded-md relative">
//                         <FaTrash className="text-red-500 cursor-pointer absolute top-4 right-4" onClick={() => handleDeletePost(selectedPost._id)} />
//                         <img src={selectedPost.post} alt="Selected Post" className="w-full rounded-md mb-4" />
//                         <div>
//                             {comments.map(comment => (
//                                 <div key={comment._id} className="mb-2">
//                                     <strong>{comment.user.username}</strong>
//                                     <p>{comment.text}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="flex mt-4">
//                             <input
//                                 type="text"
//                                 value={commentText}
//                                 onChange={(e) => setCommentText(e.target.value)}
//                                 className="border border-gray-300 p-2 rounded-md flex-grow"
//                                 placeholder="Add a comment..."
//                             />
//                             <button
//                                 onClick={handleAddComment}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//                             >
//                                 Comment
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FriendProfile;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// import SideBar from '../components/general/sideBar';
// import { useToast } from '@chakra-ui/react';
// import { IoSettingsOutline } from "react-icons/io5";
// import { AiFillMessage } from "react-icons/ai";

// const FriendProfile = () => {
//     const { friendId, friendName } = useParams();
//     const [friendPosts, setFriendPosts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState('');
//     const [friend, setFriend] = useState(null); // State to hold friend data
//     const navigate = useNavigate();

//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const config = token ? {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-type": "application/json",
//         },
//     } : {};

//     useEffect(() => {
//         fetchFriendProfile(friendId); // Fetch friend profile when friendId changes
//         fetchFriendPosts(); // Fetch friend posts
//     }, [friendId]);

//     const fetchFriendProfile = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`, config);
//             setFriend(response.data.user); // Set friend data in state
//         } catch (error) {
//             console.error('Error fetching friend profile:', error);
//         }
//     };

//     const fetchFriendPosts = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`http://localhost:4000/api/posts/myfriendposts/${friendId}`, config);
//             setFriendPosts(response.data.posts);
//         } catch (error) {
//             setError('Error fetching friend posts');
//             console.error('Error fetching friend posts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCommunication = () => {
//         if (friend) {
//             navigate(`/communication/${friend._id}/${friend.username}`); // Navigate to communication route with friendId and friendName
//         }
//     };

//     const openPostModal = (postId) => {
//         setSelectedPost(friendPosts.find(post => post._id === postId));
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
//             console.error('Error fetching comments:', error);
//         }
//     };

//     const handleAddComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
//             setComments([...comments, response.data.comment]);
//             setCommentText('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
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
//             fetchFriendPosts();
//             closeModal();
//         } catch (error) {
//             console.error('Error deleting post:', error);
//         }
//     };

//     return (
//         <div className='flex bg-black h-[100vh]'>
//             <SideBar />

//             <div className="w-4/5 p-8 ml-[20%] mt-16">
//                 <div className="flex mb-12">
//                     <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friendName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`} alt="Friend Avatar" className="h-32 w-32 rounded-full mr-4" />
//                     <div className='ml-[14rem]'>
//                         <div className='flex gap-8'>
//                             <h2 className="text-2xl cursor-pointer font-semibold text-slate-300">{friendName}</h2>
//                             {friend && (
//                                 <button onClick={handleCommunication} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'>
//                                     <AiFillMessage />
//                                 </button>
//                             )}
//                             <button className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'>
//                                 <IoSettingsOutline />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <hr className='text-gray-100 mb-12'></hr>

//                 {loading ? (
//                     <div className="flex justify-center items-center">
//                         <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//                     </div>
//                 ) : error ? (
//                     <div className="text-red-500 text-center">
//                         {error}
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//                         {friendPosts.map(post => (
//                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
//                                 <img src={post.post} alt="Friend Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
//                                 <div className="absolute top-2 right-2">
//                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
//                                 </div>
//                                 <div className="flex justify-between items-center mt-2">
//                                     <div className="flex items-center">
//                                         <FaRegHeart className="text-gray-600 cursor-pointer" />
//                                         <span className="ml-1 text-gray-600">{post.likes.length}</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <FaRegComment className="text-gray-600 cursor-pointer" />
//                                         <span className="ml-1 text-gray-600">{post.comments.length}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white w-1/2 p-6 rounded-md relative">
//                         <FaTrash className="text-red-500 cursor-pointer absolute top-4 right-4" onClick={() => handleDeletePost(selectedPost._id)} />
//                         <img src={selectedPost.post} alt="Selected Post" className="w-full rounded-md mb-4" />
//                         <div>
//                             {comments.map(comment => (
//                                 <div key={comment._id} className="mb-2">
//                                     <strong>{comment.user.username}</strong>
//                                     <p>{comment.text}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="flex mt-4">
//                             <input
//                                 type="text"
//                                 value={commentText}
//                                 onChange={(e) => setCommentText(e.target.value)}
//                                 className="border border-gray-300 p-2 rounded-md flex-grow"
//                                 placeholder="Add a comment..."
//                             />
//                             <button
//                                 onClick={handleAddComment}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//                             >
//                                 Comment
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FriendProfile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
import SideBar from '../components/general/sideBar';
import { useToast } from '@chakra-ui/react';
import { IoSettingsOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";

const FriendProfile = () => {
    const { friendId, friendName } = useParams();
    const [friendPosts, setFriendPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [friend, setFriend] = useState(null); // State to hold friend data
    const navigate = useNavigate();

    const toast = useToast();
    const token = localStorage.getItem('token');
    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
    } : {};

    useEffect(() => {
        fetchFriendProfile(friendId); // Fetch friend profile when friendId changes
        fetchFriendPosts(); // Fetch friend posts
    }, [friendId]);

    const fetchFriendProfile = async (id) => {
        try {
            const response = await axios.get(`https://liaison-main-4oyd.onrender.com/api/user/profile/${id}`, config);
            setFriend(response.data.user); // Set friend data in state
        } catch (error) {
            console.error('Error fetching friend profile:', error);
        }
    };

    const fetchFriendPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://liaison-main-4oyd.onrender.com/api/posts/myfriendposts/${friendId}`, config);
            setFriendPosts(response.data.posts);
        } catch (error) {
            setError('Error fetching friend posts');
            console.error('Error fetching friend posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCommunication = () => {
            navigate(`/communication/${friendId}/${friendName}`); 
    };


    // const handleCommunication = () => {
    //     if (friend && friend._id && friend.username) {
    //         navigate(`/communication/${friend._id}/${encodeURIComponent(friend.username)}`);
    //     }
    // };

    
    const openPostModal = (postId) => {
        setSelectedPost(friendPosts.find(post => post._id === postId));
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
            const response = await axios.get(`https://liaison-main-4oyd.onrender.com/api/comments/${postId}`, config);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`https://liaison-main-4oyd.onrender.com/api/comments/${selectedPost._id}`, { text: commentText }, config);
            setComments([...comments, response.data.comment]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`https://liaison-main-4oyd.onrender.com/api/posts/deletepost/${postId}`, config);
            toast({
                title: "Post deleted successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            fetchFriendPosts();
            closeModal();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className='flex bg-black h-[100vh]'>
            <SideBar />

            <div className="w-4/5 p-8 ml-[20%] mt-16">
                <div className="flex mb-12">
                    <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${friendName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`} alt="Friend Avatar" className="h-32 w-32 rounded-full mr-4" />
                    <div className='ml-[14rem]'>
                        <div className='flex gap-8'>
                            <h2 className="text-2xl cursor-pointer font-semibold text-slate-300">{friendName}</h2>
                            {/* {friend !== null && ( */}
                                <button onClick={() => handleCommunication(friendId, friendId)} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'>
                                    <AiFillMessage />
                                </button>
                            {/* )} */}
                            <button className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'>
                                <IoSettingsOutline />
                            </button>
                        </div>
                    </div>
                </div>

                <hr className='text-gray-100 mb-12'></hr>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {friendPosts.map(post => (
                            <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
                                <img src={post.post} alt="Friend Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
                                <div className="absolute top-2 right-2">
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center">
                                        <FaRegHeart className="text-gray-600 cursor-pointer" />
                                        <span className="ml-1 text-gray-600">{post.likes.length}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegComment className="text-gray-600 cursor-pointer" />
                                        <span className="ml-1 text-gray-600">{post.comments.length}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-1/2 p-6 rounded-md relative">
                        <FaTrash className="text-red-500 cursor-pointer absolute top-4 right-4" onClick={() => handleDeletePost(selectedPost._id)} />
                        <img src={selectedPost.post} alt="Selected Post" className="w-full rounded-md mb-4" />
                        <div>
                            {comments.map(comment => (
                                <div key={comment._id} className="mb-2">
                                    <strong>{comment.user.username}</strong>
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md flex-grow"
                                placeholder="Add a comment..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendProfile;

