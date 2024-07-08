
const mongoose = require("mongoose");

const postgraducatSchema = mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
          },
        school:{
          type: String,
          required: true,
        },
        passingYear:{
          type: String,
          required: true,
          
        },
        state: {
             type: String,
             required: true 
        },
        district: {
             type: String,
             required: true 
        },
    },
    { timestamps: true }
);

const PostGraducat = mongoose.model("PostGraducat", postgraducatSchema);

module.exports = PostGraducat;