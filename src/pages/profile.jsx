// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link, useNavigate } from "react-router-dom";
// // import { useToast } from '@chakra-ui/react';
// // import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
// // import SideBar from '../components/general/sideBar';
// // import { jwtDecode } from 'jwt-decode'; // Fixed import statement
// // import { IoSettingsOutline } from "react-icons/io5";
// // import { FaUserCheck } from "react-icons/fa";

// // const ProfilePage = () => {
// //     const [user, setUser] = useState({});
// //     const [posts, setPosts] = useState([]);
// //     const [loadingProfile, setLoadingProfile] = useState(false);
// //     const [loadingPosts, setLoadingPosts] = useState(false);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [selectedPost, setSelectedPost] = useState(null);
// //     const [comments, setComments] = useState([]);
// //     const [commentText, setCommentText] = useState('');
// //     const [friends, setFriends] = useState([]);
// //     const [friendCount, setFriendCount] = useState(0);
// //     const [postCount, setPostCount] = useState(0);
// //     const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);

// //     const navigate = useNavigate();
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
// //         fetchUserFriends();
// //     }, []);

// //     const fetchUserProfile = async () => {
// //         setLoadingProfile(true);
// //         try {
// //             const response = await axios.get('https://liaison-main-4u51.onrender.com/api/user/profile', config);
// //             setUser(response.data.user);
// //         } catch (error) {
// //             handleFetchError(error, 'profile');
// //         } finally {
// //             setLoadingProfile(false);
// //         }
// //     };

// //     const fetchUserPosts = async () => {
// //         setLoadingPosts(true);
// //         try {
// //             const response = await axios.get('https://liaison-main-4u51.onrender.com/api/posts/myposts', config);
// //             setPosts(response.data.posts);
// //             setPostCount(response.data.posts.length);
// //         } catch (error) {
// //             handleFetchError(error, 'posts');
// //         } finally {
// //             setLoadingPosts(false);
// //         }
// //     };

// //     const fetchUserFriends = async () => {
// //         try {
// //             const response = await axios.get('https://liaison-main-4u51.onrender.com/api/usersearch/userfriend', config);
// //             setFriends(response.data.friends);
// //             setFriendCount(response.data.friends.length);
// //         } catch (error) {
// //             handleFetchError(error, 'friends');
// //         }
// //     };

// //     const fetchUserFriendPost = async () => {
// //         setLoadingPosts(true);
// //         try {
// //             const response = await axios.get('https://liaison-main-4u51.onrender.com/api/posts/myfriendposts', config);
// //             setPosts(response.data.posts);
// //         } catch (error) {
// //             handleFetchError(error, 'posts');
// //         } finally {
// //             setLoadingPosts(false);
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
// //             await axios.delete(`https://liaison-main-4u51.onrender.com/api/posts/deletepost/${postId}`, config);
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
// //         setSelectedPost(posts.find(post => post._id === postId));
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
// //             const response = await axios.get(`https://liaison-main-4u51.onrender.com/api/comments/${postId}`, config);
// //             setComments(response.data.comments);
// //         } catch (error) {
// //             handleFetchError(error, 'comments');
// //         }
// //     };

// //     const handlerEditProfile = () => {
// //         navigate("/info");
// //     };

// //     const handlerSeeFriendProfile = () => {
// //         navigate("/SeeFriendProfile");
// //     };

// //     const handleAddComment = async () => {
// //         try {
// //             const response = await axios.post(`https://liaison-main-4u51.onrender.com/api/comments/${selectedPost._id}`, { text: commentText }, config);
// //             setComments([...comments, response.data.comment]);
// //             setCommentText('');
// //         } catch (error) {
// //             handleFetchError(error, 'comment addition');
// //         }
// //     };

// //     const generateUserImgUrl = (firstName) => {
// //         return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
// //     };

// //     const handleFriendCountClick = () => {
// //         setIsFriendModalOpen(true);
// //     };

// //     const closeFriendModal = () => {
// //         setIsFriendModalOpen(false);
// //     };

// //     const handleModalClick = (event) => {
// //         if (event.target === event.currentTarget) {
// //             closeFriendModal();
// //         }
// //     };

// //     return (
// //         <div className='flex bg-black h-[100vh]'>
// //             <SideBar />

// //             <div className="w-4/5 p-8 ml-[20%] mt-16">
// //                 {loadingProfile ? (
// //                     <div className="flex justify-center items-center">
// //                         <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
// //                     </div>
// //                 ) : (
// //                     <>
// //                         <div className="flex mb-12">
// //                             <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-32 w-32 rounded-full mr-4" />
// //                             <div className='ml-[14rem]'>
// //                                 <div className='flex gap-8'>
// //                                     <h2 className="text-2xl cursor-pointer font-semibold text-slate-300">{username}</h2>
// //                                     <button onClick={handlerEditProfile} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10'> Edit Profile</button>
// //                                     <button onClick={handlerEditProfile} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'> <IoSettingsOutline /> </button>
// //                                 </div>

// //                                 <div className='flex gap-16 mt-4 text-slate-300 cursor-pointer font-semibold'>
// //                                     <h3> {postCount} Post</h3>
// //                                     <h3 onClick={handleFriendCountClick}> {friendCount} friends</h3>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <hr className='text-gray-100 mb-12'></hr>
// //                     </>
// //                 )}

// //                 {loadingPosts ? (
// //                     <div className="flex justify-center items-center">
// //                         <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
// //                     </div>
// //                 ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// //                         {posts.map(post => (
// //                             <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
// //                                 <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
// //                                 <div className="absolute top-2 right-2">
// //                                     <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePost(post._id)} />
// //                                 </div>
// //                                 <div className="flex justify-between items-center mt-2">
// //                                     <div className="flex items-center">
// //                                         <FaRegHeart className="text-gray-600 cursor-pointer" />
// //                                         <span className="ml-1 text-gray-600">{post.likes.length}</span>
// //                                     </div>
// //                                     <div className="flex items-center">
// //                                         <FaRegComment className="text-gray-600 cursor-pointer" />
// //                                         <span className="ml-1 text-gray-600">{post.comments.length}</span>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //                     <div className="bg-white w-1/2 p-6 rounded-md relative">
// //                         <FaTrash className="text-red-500 cursor-pointer absolute top-4 right-4" onClick={() => handleDeletePost(selectedPost._id)} />
// //                         <img src={selectedPost.post} alt="Selected Post" className="w-full rounded-md mb-4" />
// //                         <div>
// //                             {comments.map(comment => (
// //                                 <div key={comment._id} className="mb-2">
// //                                     <strong>{comment.user.username}</strong>
// //                                     <p>{comment.text}</p>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         <div className="flex mt-4">
// //                             <input
// //                                 type="text"
// //                                 value={commentText}
// //                                 onChange={(e) => setCommentText(e.target.value)}
// //                                 className="border border-gray-300 p-2 rounded-md flex-grow"
// //                                 placeholder="Add a comment..."
// //                             />
// //                             <button
// //                                 onClick={handleAddComment}
// //                                 className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
// //                             >
// //                                 Comment
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //             {isFriendModalOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleModalClick}>
// //                     <div className="bg-zinc-900 w-1/3 p-6 rounded-md text-gray-300">
// //                         <h2 className="text-2xl mb-4">Friends</h2>
// //                         <div className="grid grid-cols-1 gap-4">
// //                             {friends.map(friend => (
// //                                 <>
// //                                 <hr/>
// //                                 <div key={friend.id} className="flex items-center justify-between cursor-pointer" onClick={closeFriendModal}>
// //                                     <div className="flex items-center" onClick={handlerSeeFriendProfile}>
// //                                         <img  src={generateUserImgUrl(friend.username)} alt={friend.username} className="w-12 h-12 rounded-full mr-4" />
// //                                         <span>{friend.username}</span>
// //                                     </div>
// //                                     <button onClick={handlerSeeFriendProfile} className='bg-zinc-600 hover:bg-zinc-800 text-slate-300 px-4 py-1 rounded-md flex items-center gap-2'>
// //                                     <FaUserCheck/> friends
// //                                     </button>
// //                                 </div>
// //                                 </>


// //                             ))}
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ProfilePage;












// ************************************************************************************************************************************************************************************

















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { FaRegHeart, FaRegComment, FaTrash } from 'react-icons/fa';
import SideBar from '../components/general/sideBar';
import { jwtDecode } from 'jwt-decode'; // Fixed import statement
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [friends, setFriends] = useState([]);
    const [friendId, setFriendId] = useState([]);
    const [friendCount, setFriendCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);

    const navigate = useNavigate();
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
        fetchUserFriends();
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
            setPostCount(response.data.posts.length);
        } catch (error) {
            handleFetchError(error, 'posts');
        } finally {
            setLoadingPosts(false);
        }
    };

        const fetchUserFriends = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/usersearch/getuserallfriend', config);
            // console.log(response.data); 
            setFriends(response.data.friends);
            setFriendCount(response.data.friends.length);
        } catch (error) {
            handleFetchError(error, 'friends');
        }
    };

    const fetchUserFriendPost = async () => {
        setLoadingPosts(true);
        try {
            const response = await axios.get('http://localhost:4000/api/posts/myfriendposts', config);
            setPosts(response.data.posts);
        } catch (error) {
            handleFetchError(error, 'posts');
        } finally {
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

    const handlerEditProfile = () => {
        navigate("/info");
    };

    const handlerSeeFriendProfile = (friendId, friendName) => {
        navigate(`/friendProfile/${friendId}/${friendName}`);
    };


    const handleAddComment = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/comments/${selectedPost._id}`, { text: commentText }, config);
            setComments([...comments, response.data.comment]);
            setCommentText('');
        } catch (error) {
            handleFetchError(error, 'comment addition');
        }
    };

    const generateUserImgUrl = (firstName) => {
        return `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;
    };

    const handleFriendCountClick = () => {
        setIsFriendModalOpen(true);
    };

    const closeFriendModal = () => {
        setIsFriendModalOpen(false);
    };

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            closeFriendModal();
        }
    };

    return (
        <div className='profile flex bg-black h-screen'>
            <div>
            <SideBar />

            </div>

            <div className="profile0 w-4/5 p-8 ml-[20%] mt-16">
                {loadingProfile ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="profile1 flex mb-12">
                            <img src={generateUserImgUrl(username)} alt="User Avatar" className="h-32 w-32 rounded-full mr-4" />
                            <div className='profile2 ml-[14rem]'>
                                <div className=' profile4 flex gap-8'>
                                    <h2 className="text-2xl cursor-pointer font-semibold text-slate-300">{username}</h2>
                                    <button onClick={handlerEditProfile} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10'> Edit Profile</button>
                                    <button onClick={handlerEditProfile} className='flex cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-slate-300 px-4 py-2 rounded-md items-center text-left h-10 text-xl'> <IoSettingsOutline /> </button>
                                </div>

                                <div className='flex gap-16 mt-4 text-slate-300 cursor-pointer font-semibold'>
                                    <h3> {postCount} Post</h3>
                                    <h3 onClick={handleFriendCountClick}> {friendCount} friends</h3>
                                </div>
                            </div>
                        </div>

                        <hr className='text-gray-100 mb-12'></hr>
                    </>
                )}

                {loadingPosts ? (
                    <div className="flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="profile3 grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
                        {posts.map(post => (
                            <div key={post._id} className="bg-white p-4 rounded-md shadow-md relative">
                                <img src={post.post} alt="User Post" className="w-full rounded-md cursor-pointer" onClick={() => openPostModal(post._id)} />
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

                      {isFriendModalOpen && (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleModalClick}>
                    <div className="profilefriend bg-zinc-900 w-1/3 p-6 rounded-md text-gray-300">
                            <h2 className="text-2xl font-semibold mb-4"> Friends</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {friends.map((friend) => (
                                    <>
                                    <hr/>
                                    <div key={friend._id} className="flex items-center justify-between cursor-pointer">
                                        <div onClick={() => handlerSeeFriendProfile(friend._id, friend.username)} className='flex  items-center gap-2'>
                                        <img src={generateUserImgUrl(friend.username)} alt="User Avatar" className="h-10 w-10 rounded-full mr-2"/>
                                            <h3 className="text-lg font-semibold cursor-pointer" >
                                                {friend.username}
                                            </h3>
                                            {/* <p className="text-gray-500">{friend.fullname}</p> */}
                                        </div>
                                        <button onClick={() => handlerSeeFriendProfile(friend._id, friend.username)} className='bg-zinc-600 hover:bg-zinc-800 text-slate-300 px-4 py-1 rounded-md flex items-center gap-2'>
                                                <FaUserCheck/> <span className='hidden-text'>friends</span>
                                            </button>
                                    </div>
                                    </>
                                ))}
                            </div>
                            <button
                                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                                onClick={closeFriendModal}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ProfilePage;





