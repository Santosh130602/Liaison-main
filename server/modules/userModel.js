
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
          required: true 
        },
        firstName:{
          type: String,
          required: true,
        },
        lastName:{
          type: String,
          required: true,
        },
        email: {
             type: String,
             unique: true,
             required: true 
        },
        password: {
             type: String,
             required: true 
        },
        InterMedium: {
          type: mongoose.Schema.Types.ObjectId,
           ref: 'InterMedium'
        },
        Highschool: {
          type: mongoose.Schema.Types.ObjectId,
           ref: 'Highschool'
          },
        Graducation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Graducation'
        },
        PostGraducat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PostGraducat'
        },
        friends: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }]

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;