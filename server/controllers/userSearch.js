// const express = require('express');
// const router = express.Router();
// const asyncHandler = require('express-async-handler');
// const User = require('../modules/userModel');
// const Highschool = require('../modules/userHighSchool');
// const InterMedium = require('../modules/userIntermedium');
// const Graducation = require('../modules/userGraducation');
// const PostGraducat = require('../modules/userPostGraduact');
// const FriendRequest = require('../modules/userFriend');

// // Endpoint for fetching suggestions
// const userSuggestions = asyncHandler(async (req, res) => {
//     const { type } = req.params;
//     const { query, educationType } = req.query;

//     let suggestions = [];
//     try {
//         if (type === 'usernames') {
//             suggestions = await User.find({ username: new RegExp(query, 'i') }).limit(10).select('username');
//         } else if (type === 'schools') {
//             if (educationType === 'HighSchool') {
//                 suggestions = await Highschool.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
//             } else if (educationType === 'Intermediate') {
//                 suggestions = await InterMedium.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
//             } else if (educationType === 'Graducation') {
//                 suggestions = await Graducation.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
//             } else if (educationType === 'PostGraducat') {
//                 suggestions = await PostGraducat.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
//             }
//         } else if (type === 'state') {
//             suggestions = await User.find({ state: new RegExp(query, 'i') }).limit(10).select('state');
//         } else if (type === 'district') {
//             suggestions = await User.find({ district: new RegExp(query, 'i') }).limit(10).select('district');
//         }
//         res.json(suggestions.map(s => s[type.slice(0, -1)])); // Return only the suggestion values
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching suggestions' });
//     }
// });



// // const userSearch = asyncHandler(async (req, res) => {
// //     const { educationLevel, school } = req.query;

// //     console.log(`Received search parameters: ${JSON.stringify(req.query)}`);

// //     let educationModel;
// //     switch (educationLevel) {
// //         case 'HighSchool':
// //             educationModel = Highschool;
// //             break;
// //         case 'Intermediate':
// //             educationModel = InterMedium;
// //             break;
// //         case 'Graducation':
// //             educationModel = Graducation;
// //             break;
// //         case 'PostGraducat':
// //             educationModel = PostGraducat;
// //             break;
// //         default:
// //             return res.status(400).json({ message: 'Invalid education level provided' });
// //     }

// //     try {
// //         const educationRecords = await educationModel.find({
// //             school: new RegExp(school, 'i')
// //         }).populate('userId', 'username firstName lastName');

// //         console.log('Found education records:', educationRecords);

// //         const users = educationRecords.map(record => {
// //             if (!record.userId) {
// //                 console.warn(`Missing userId in record: ${JSON.stringify(record)}`);
// //                 return null;
// //             }
// //             return {
// //                 _id: record.userId._id,
// //                 username: record.userId.username,
// //                 firstName: record.userId.firstName,
// //                 lastName: record.userId.lastName
// //             };
// //         }).filter(user => user !== null);
       

// //         res.json(users);
// //     } catch (error) {
// //         console.error('Error during user search:', error);
// //         res.status(500).json({ message: 'Error searching users' });
// //     }
// // });

// // module.exports = { userSearch };

// const userSearch = asyncHandler(async (req, res) => {
//     const { username } = req.query;

//     try {
//         const users = await User.find({ username: new RegExp(username, 'i') })
//                                 .select('username firstName lastName');
                                
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error searching users' });
//     }
// });


// const getAllFriendRequests = asyncHandler(async (req, res) => {
//     const userId = req.user._id; // Assuming req.user has the logged-in user's details
  
//     const friendRequests = await FriendRequest.find({ recipient: userId })
//       .populate('requester', 'username'); // Populate requester details
  
//     res.json({ friendRequests });
//   });
  


// // const acceptFriendRequest = asyncHandler(async (req, res) => {
// //     const requestId = req.params.id;
  
// //     const friendRequest = await FriendRequest.findById(requestId);
    
// //     if (!friendRequest) {
// //       return res.status(404).json({ message: 'Friend request not found' });
// //     }
  
// //     if (friendRequest.recipient.toString() !== req.user._id.toString()) {
// //       return res.status(403).json({ message: 'Unauthorized to accept this request' });
// //     }
// //     // console.log(friendRequest);
// //     await friendRequest.remove();
  
// //     res.json({ message: 'Friend request accepted successfully' });
// //   });

// const acceptFriendRequest = asyncHandler(async (req, res) => {
//   try {
//     const requestId = req.params.id;
//     const friendRequest = await FriendRequest.findById(requestId);
//     console.log(friendRequest);

//     if (!friendRequest) {
//       return res.status(404).json({ message: 'Friend request not found' });
//     }

//     if (friendRequest.recipient.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Unauthorized to accept this request' });
//     }

//     friendRequest.status = 'accepted';
//     await friendRequest.save();
//     // await friendRequest.remove();
//     // await friendRequest.deleteOne();
//     res.json({ message: 'Friend request accepted successfully' });
//   } catch (error) {
//     console.error('Error accepting friend request:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



  
// const rejectFriendRequest = asyncHandler(async (req, res) => {
//     const requestId = req.params.id;
  
//     const friendRequest = await FriendRequest.findById(requestId);
//     if (!friendRequest) {
//       return res.status(404).json({ message: 'Friend request not found' });
//     }
  
//     if (friendRequest.recipient.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Unauthorized to reject this request' });
//     }
 
//     // await friendRequest.remove();
//     await friendRequest.deleteOne();
    
  
//     res.json({ message: 'Friend request rejected successfully' });
//   });
  



// const sendFriendRequest = asyncHandler(async (req, res) => {
//     const { userId } = req.params;
  
//     // Check if there's already a pending request from the logged-in user to the recipient
//     const existingRequest = await FriendRequest.findOne({
//       requester: req.user._id,
//       recipient: userId,
//     });
  
//     if (existingRequest) {
//       return res.status(400).json({ message: 'Friend request already sent' });
//     }
  
//     const newFriendRequest = new FriendRequest({
//       requester: req.user._id,
//       recipient: userId,
//     });
  
//     await newFriendRequest.save();
//     res.json({ message: 'Friend request sent successfully' });
//   });
  


// const userAddFriend = asyncHandler(async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const newFriendRequest = new FriendRequest({
//             requester: req.user._id,
//             recipient: userId
//         });
//         await newFriendRequest.save();
//         res.json({ message: 'Friend request sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error sending friend request' });
//     }
// });














// module.exports = {userSuggestions, userSearch, getAllFriendRequests, acceptFriendRequest, rejectFriendRequest,userAddFriend, sendFriendRequest,};















// ***************************************************************************************************************************



const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../modules/userModel');
const Highschool = require('../modules/userHighSchool');
const InterMedium = require('../modules/userIntermedium');
const Graducation = require('../modules/userGraducation');
const PostGraducat = require('../modules/userPostGraduact');
const FriendRequest = require('../modules/userFriend');

// Fetch user suggestions based on type and query
const userSuggestions = asyncHandler(async (req, res) => {
    const { type } = req.params;
    const { query, educationType } = req.query;

    try {
        let suggestions = await fetchSuggestions(type, query, educationType);
        res.json(suggestions.map(s => s[type.slice(0, -1)])); // Return only the suggestion values
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
});

// Fetch suggestions based on type and query
const fetchSuggestions = async (type, query, educationType) => {
    if (type === 'usernames') {
        return await User.find({ username: new RegExp(query, 'i') }).limit(10).select('username');
    } else if (type === 'schools') {
        return await fetchSchoolSuggestions(query, educationType);
    } else if (type === 'state') {
        return await User.find({ state: new RegExp(query, 'i') }).limit(10).select('state');
    } else if (type === 'district') {
        return await User.find({ district: new RegExp(query, 'i') }).limit(10).select('district');
    }
};

// Fetch school suggestions based on query and education type
const fetchSchoolSuggestions = async (query, educationType) => {
    if (educationType === 'HighSchool') {
        return await Highschool.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
    } else if (educationType === 'Intermediate') {
        return await InterMedium.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
    } else if (educationType === 'Graducation') {
        return await Graducation.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
    } else if (educationType === 'PostGraducat') {
        return await PostGraducat.find({ school: new RegExp(query, 'i') }).limit(10).select('school');
    }
};

// Search for users based on username
// const userSearch = asyncHandler(async (req, res) => {
//     const { username } = req.query;


//     try {
//         const users = await User.find({ username: new RegExp(username, 'i') })
//                                 .select('username firstName lastName');
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error searching users' });
//     }
// });

const userSearch = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const userId = req.user._id; // Assuming userId is available in req.user._id

  try {
      // Find users excluding the current user by userId
      const users = await User.find({
          _id: { $ne: userId }, // Exclude the current user
          username: new RegExp(username, 'i')
      }).select('username firstName lastName');

      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error searching users' });
  }
});

// Fetch all friend requests for the logged-in user




// const getAllFriendRequests = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const friendRequests = await FriendRequest.find({ recipient: userId })
//             .populate('requester', 'username');
//         res.json({ friendRequests });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching friend requests' });
//     }
// });

// // Accept a friend request
// const acceptFriendRequest = asyncHandler(async (req, res) => {
//     const requestId = req.params.id;

//     try {
//         const friendRequest = await FriendRequest.findById(requestId);

//         if (!friendRequest) {
//             return res.status(404).json({ message: 'Friend request not found' });
//         }

//         if (friendRequest.recipient.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized to accept this request' });
//         }

//         friendRequest.status = 'accepted';
//         await friendRequest.save();
//         res.json({ message: 'Friend request accepted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error accepting friend request' });
//     }
// });

// // Reject a friend request
// const rejectFriendRequest = asyncHandler(async (req, res) => {
//     const requestId = req.params.id;

//     try {
//         const friendRequest = await FriendRequest.findById(requestId);

//         if (!friendRequest) {
//             return res.status(404).json({ message: 'Friend request not found' });
//         }

//         if (friendRequest.recipient.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized to reject this request' });
//         }

//         await friendRequest.deleteOne();
//         res.json({ message: 'Friend request rejected successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error rejecting friend request' });
//     }
// });


// // Send a friend request
// const sendFriendRequest = asyncHandler(async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const existingRequest = await FriendRequest.findOne({
//             requester: req.user._id,
//             recipient: userId,
//         });

//         if (existingRequest) {
//             return res.status(400).json({ message: 'Friend request already sent' });
//         }

//         const newFriendRequest = new FriendRequest({
//             requester: req.user._id,
//             recipient: userId,
//         });

//         await newFriendRequest.save();
//         res.json({ message: 'Friend request sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error sending friend request' });
//     }
// });






// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const FriendRequest = require('../models/friendRequestModel');

// Get all friend requests for the logged-in user

const getAllFriendRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const friendRequests = await FriendRequest.find({ recipient: userId, status: 'pending' })
      .populate('requester', 'username');
    res.json({ friendRequests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
});

// Accept a friend request
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to accept this request' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Add each user to the other's friend list
    await User.findByIdAndUpdate(friendRequest.requester, {
      $addToSet: { friends: friendRequest.recipient }
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.requester }
    });

    res.json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request' });
  }
});

// Reject a friend request
const rejectFriendRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to reject this request' });
    }

    await friendRequest.deleteOne();
    res.json({ message: 'Friend request rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
});

// Send a friend request



// const sendFriendRequest = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const existingRequest = await FriendRequest.findOne({
//       requester: req.user._id,
//       recipient: userId,
//       status: 'pending'
//     });

//     if (existingRequest) {
//       return res.status(400).json({ message: 'Friend request already sent' });
//     }

//     const newFriendRequest = new FriendRequest({
//       requester: req.user._id,
//       recipient: userId
//     });

//     await newFriendRequest.save();
//     res.json({ message: 'Friend request sent successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending friend request' });
//   }
// });



const sendFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
      const existingRequest = await FriendRequest.findOne({
          requester: req.user._id,
          recipient: userId,
          status: { $in: ['pending', 'accepted'] }  // Check for pending or accepted status
      });

      if (existingRequest) {
          return res.status(400).json({ message: 'Friend request already sent or user is already your friend' });
      }

      const newFriendRequest = new FriendRequest({
          requester: req.user._id,
          recipient: userId,
      });

      await newFriendRequest.save();
      res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error sending friend request' });
  }
});

const checkFriendshipStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  try {
      const existingRequest = await FriendRequest.findOne({
          $or: [
              { requester: currentUserId, recipient: userId, status: 'accepted' },
              { requester: userId, recipient: currentUserId, status: 'accepted' }
          ]
      });

      if (existingRequest) {
          return res.json({ status: 'friends' });
      }

      const pendingRequest = await FriendRequest.findOne({
          $or: [
              { requester: currentUserId, recipient: userId, status: 'pending' },
              { requester: userId, recipient: currentUserId, status: 'pending' }
          ]
      });

      if (pendingRequest) {
          return res.json({ status: 'pending' });
      }

      res.json({ status: 'none' });
  } catch (error) {
      res.status(500).json({ message: 'Error checking friendship status' });
  }
});


















const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const friends = await FriendRequest.find({
      $or: [
        { requester: userId, status: 'accepted' },
        { recipient: userId, status: 'accepted' }
      ]
    }).populate('requester recipient', 'username email');

    const friendList = friends.map(friend => {
      return friend.requester._id.toString() === userId.toString()
        ? friend.recipient
        : friend.requester;
    });

    res.json({ friends: friendList });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends' });
  }
});


module.exports = {
    userSuggestions,
    userSearch,
    getAllFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
    getFriends,
    checkFriendshipStatus
};
