const express = require('express');
const { userEducation } = require('../controllers/userEducation');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


// router.route('/addedulevel').post(userEducation);
router.post('/addedulevel',protect, userEducation);

module.exports = router;

