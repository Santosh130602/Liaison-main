const express = require('express');
const {addMessage,getMessage, createChat ,userChats, findChat} = require('../controllers/communicationController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.route('/').post(createChat);
router.route('/:userId').get(userChats)
router.route('/find/:userId/:friendId').get(findChat);
router.route('/find/:firstId/:secondId').get(findChat);

router.route('/addmessage').post(addMessage);
router.route('/find/:chatId').get(getMessage);


module.exports = router;




