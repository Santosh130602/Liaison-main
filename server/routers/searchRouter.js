const express = require('express');
const { userSuggestions, userSearch, getAllFriendRequests, getMyAllFriends, acceptFriendRequest, rejectFriendRequest, sendFriendRequest,getFriends, checkFriendshipStatus} = require('../controllers/userSearch');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


// router.post('/addfriends/:userId',protect, userAddFriend);
router.get('/suggestions/:type',protect, userSuggestions);
router.get('/usersearch',protect, userSearch);
router.get('/notifications/friendRequests',protect, getAllFriendRequests);
router.put('/notifications/friendRequests/:id/accept',protect, acceptFriendRequest);
router.put('/notifications/friendRequests/:id/reject',protect, rejectFriendRequest);
router.post('/notifications/friendRequests/addfriends/:userId',protect, sendFriendRequest);
router.get('/userfriend',protect, getFriends);
// router.get('/notifications/friendRequests', protect, getAllFriendRequests);
router.get('/friendStatus/:userId', protect, checkFriendshipStatus);
router.get('/getuserallfriend',protect, getMyAllFriends);
module.exports = router;

