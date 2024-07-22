

// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   chatId: {type:String},
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const MessageModel = mongoose.model('MessageModel', messageSchema);
// module.exports = MessageModel




const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model('MessageModel', MessageSchema);
module.exports = MessageModel
