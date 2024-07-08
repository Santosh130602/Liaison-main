const asyncHandler = require("express-async-handler");
const User = require('../modules/userModel');
const Post = require('../modules/postModel');



// ********************  add Past

const addPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { post,caption } = req.body;

    if (!post || ! caption) {
        res.status(400);
        throw new Error('Please upload a Post and caption.');
    }
    const createdPost = await Post.create({
        user: userId,
        post: post,
        caption:caption,
    });
    
    const populatedPost = await Post.findById(createdPost._id)
        .populate('user', '-password -email');

    res.status(201).json(populatedPost);
});



//   Get My post
const getMyPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const posts = await Post.find({ user: userId }).populate('user', '-password -email').sort({ createdAt: -1 });

    res.status(200).json({ userId, posts });
});

// get friend post 
const getMyFriendPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const posts = await Post.find({ user: userId }).populate('user', '-password -email').sort({ createdAt: -1 });

    res.status(200).json({ userId, posts });
});



//  get all post 

const getAllPosts = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const posts = await Post.find().populate('user', '-password -email').sort({ createdAt: -1 });

    res.status(200).json({ userId, posts });
});




//  update post 

const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const { post } = req.body;
    const userId = req.user._id;

    if (!postId) {
        res.status(400);
        throw new Error('Post ID is required.');
    }

    if (!post) {
        res.status(400);
        throw new Error('Please add a Post.');
    }

    let updatedPost = await Post.findById(postId);

    if (!updatedPost) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (updatedPost.user.toString() !== userId.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this post');
    }

    updatedPost = await Post.updateOne({ _id: postId }, { $set: { post: post } });

    updatedPost = await Post.findById(postId).populate('user', '-password -email');

    res.status(200).json(updatedPost);
});



//  delete post 


const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;

    if (!postId) {
        res.status(400);
        throw new Error('Post ID is required');
    }

    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== userId.toString()) {
        res.status(403);
        throw new Error('Not authorized to delete this post');
    }

    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: 'Post deleted successfully' });
});


//  like post 


const addLikeToPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
        await Post.updateOne(
            { _id: postId },
            { $pull: { likes: userId } }
        );
        res.status(200).json({ message: 'Post unliked successfully' });
    } else {
        await Post.updateOne(
            { _id: postId },
            { $push: { likes: userId } }
        );
        res.status(200).json({ message: 'Post liked successfully' });
    }
});

module.exports = { addPost, getMyPost, getAllPosts, updatePost, deletePost, addLikeToPost,getMyFriendPost }













// const asyncHandler = require("express-async-handler");
// const User = require('../modules/userModel');
// const Post = require('../modules/postModel');
// const cloudinary = require('../config/cloudinary'); // Import Cloudinary configuration

// const addPost = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const { post, image } = req.body; // Expecting image URL or image data in the request body

//     if (!post) {
//         res.status(400);
//         throw new Error('Please add a Post.');
//     }

//     let imageUrl = '';

//     // Upload image to Cloudinary if image data is provided
//     if (image) {
//         try {
//             const result = await cloudinary.uploader.upload(image, {
//                 folder: 'posts', // Optional: Specify a folder in Cloudinary
//             });
//             imageUrl = result.secure_url; // Get the URL of the uploaded image
//         } catch (error) {
//             res.status(500);
//             throw new Error('Image upload failed.');
//         }
//     }

//     // Create the post with the image URL if provided
//     const createdPost = await Post.create({
//         user: userId,
//         post: post,
//         image: imageUrl,
//     });

//     const populatedPost = await Post.findById(createdPost._id)
//         .populate('user', '-password -email');

//     res.status(201).json(populatedPost);
// });

// module.exports = { addPost };
