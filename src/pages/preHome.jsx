import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreHome = () => {
    const [loadingPost, setLoadingPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const getAllPost = async () => {
        setLoadingPost(true);
        setError(null); // Reset the error state before making the request
        try {
            const response = await axios.get('https://liaison-main-4u51.onrender.com/api/posts/posts/withoulogin');
            const { posts } = response.data;
            setPosts(posts);
        } catch (error) {
            console.error(error);
            setError('Failed to load posts');
        } finally {
            setLoadingPost(false);
        }
    }

    useEffect(() => {
        getAllPost();
    }, []);

    return (
        <div>
            {loadingPost ? (
                <p>Loading posts...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default PreHome;
