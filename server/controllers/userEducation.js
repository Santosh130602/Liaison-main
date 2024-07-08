
// const Highschool = require('../modules/userHighSchool')
// const InterMedium = require('../modules/userIntermedium')
// const Graducation = require('../modules/userGraducation')
// const PostGraducat = require('../modules/userPostGraduact')
// const User = require('../modules/userModel');
// const asyncHandler = require('express-async-handler');
// const { request } = require('express');

// // Controller function to store or update user education details
// const userEducation = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const { educationType, educationData } = req.body;
//     // const userId = "668523c244efa8f33f94fb5c"
//     console.log('Received data:', {userId, educationType, educationData });

//     try {
//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             res.status(404);
//             throw new Error('User not found');
//         }

//         let Model;

//         switch (educationType) {
//             case 'highschool':
//                 Model = Highschool;
//                 break;
//             case 'intermediate':
//                 Model = InterMedium;
//                 break;
//             case 'graduation':
//                 Model = Graducation;
//                 break;
//             case 'postGraduation':
//                 Model = PostGraducat;
//                 break;
//             default:
//                 res.status(400);
//                 throw new Error('Invalid education type');
//         }

//         // Check if an existing record for this user and education type exists
//         const existingRecord = await Model.findOne({ username: userId });

//         if (existingRecord) {
//             // Update the existing record
//             existingRecord.set(educationData);
//             await existingRecord.save();

//             res.status(200).json({
//                 success: true,
//                 message: 'User education details updated successfully',
//                 data: existingRecord,
//             });
//         } else {
//             // Create a new record
//             const newEducationRecord = new Model({
//                 username: userId,
//                 ...educationData,
//             });

//             await newEducationRecord.save();

//             res.status(201).json({
//                 success: true,
//                 message: 'User education details stored successfully',
//                 data: newEducationRecord,
                
//             });
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// module.exports = { userEducation };








// const Highschool = require('../modules/userHighSchool');
// const InterMedium = require('../modules/userIntermedium');
// const Graducation = require('../modules/userGraducation');
// const PostGraducat = require('../modules/userPostGraduact');
// const User = require('../modules/userModel');
// const asyncHandler = require('express-async-handler');
// const { request } = require('express');

// // Controller function to store or update user education details
// const userEducation = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     // const userId = "668523c244efa8f33f94fb5c"
//     const { educationType, educationData } = req.body;
//     console.log('Received data:', {userId, educationType, educationData });

//     try {
//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             res.status(404);
//             throw new Error('User not found');
//         }

//         let Model;

//         switch (educationType) {
//             case 'highschool':
//                 Model = Highschool;
//                 break;
//             case 'intermediate':
//                 Model = InterMedium;
//                 break;
//             case 'graduation':
//                 Model = Graducation;
//                 break;
//             case 'postGraduation':
//                 Model = PostGraducat;
//                 break;
//             default:
//                 res.status(400);
//                 throw new Error('Invalid education type');
//         }

//         // Check if an existing record for this user and education type exists
//         const existingRecord = await Model.findOne({ username: userId });

//         if (existingRecord) {
//             // Update the existing record
//             existingRecord.set(educationData);
//             await existingRecord.save();

//             res.status(200).json({
//                 success: true,
//                 message: 'User education details updated successfully',
//                 data: existingRecord,
//             });
//         // }
//         //  else {
//             // Create a new record
//             const newEducationRecord = new Model({
//                 username: userId,
//                 ...educationData,
//             });

//             await newEducationRecord.save();

//             res.status(201).json({
//                 success: true,
//                 message: 'User education details stored successfully',
//                 data: newEducationRecord,
                
//             });
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// module.exports = { userEducation };



const Highschool = require('../modules/userHighSchool');
const InterMedium = require('../modules/userIntermedium');
const Graducation = require('../modules/userGraducation');
const PostGraducat = require('../modules/userPostGraduact');
const User = require('../modules/userModel');
const asyncHandler = require('express-async-handler');
const { request } = require('express');

// Controller function to store or update user education details
const userEducation = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // const userId = "668523c244efa8f33f94fb5c"
    const { educationType, educationData } = req.body;
    console.log('Received data:', {userId, educationType, educationData });

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        let Model;

        switch (educationType) {
            case 'highschool':
                Model = Highschool;
                break;
            case 'intermediate':
                Model = InterMedium;
                break;
            case 'graduation':
                Model = Graducation;
                break;
            case 'postGraduation':
                Model = PostGraducat;
                break;
            default:
                res.status(400);
                throw new Error('Invalid education type');
        }

        // Check if an existing record for this user and education type exists
        const existingRecord = await Model.findOne({ username: userId });

        if (existingRecord) {
            // Update the existing record
            existingRecord.set(educationData);
            await existingRecord.save();

            console.log('Education details updated successfully:', existingRecord);
            res.status(200).json({
                success: true,
                message: 'User education details updated successfully',
                data: existingRecord,
            });
        } else {
            // Create a new record
            const newEducationRecord = new Model({
                username: userId,
                ...educationData,
            });

            await newEducationRecord.save();

            console.log('Education details stored successfully:', newEducationRecord);
            res.status(201).json({
                success: true,
                message: 'User education details stored successfully',
                data: newEducationRecord,
            });
        }
    } catch (error) {
        console.error('Error storing education details:', error.message);
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = { userEducation };
