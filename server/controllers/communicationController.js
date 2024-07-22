// // const Message = require('../modules/communicationModels');
// // const VideoCall = require('../modules/communicationModels');
// // const AudioCall = require('../modules/communicationModels');

// // // Send message controller function
// // const sendMessage = async (req, res) => {
// //     const { senderId, receiverId, message } = req.body;
// //     try {
// //         // Save message to database
// //         const newMessage = await Message.create({
// //             sender: senderId,
// //             receiver: receiverId,
// //             message: message
// //         });
// //         res.status(200).json({ message: 'Message sent successfully', data: newMessage });
// //     } catch (error) {
// //         console.error('Error sending message:', error);
// //         res.status(500).json({ error: 'Failed to send message' });
// //     }
// // };

// // // Initiate video call controller function
// // const initiateVideoCall = async (req, res) => {
// //     const { callerId, receiverId } = req.body;
// //     try {
// //         // Save video call details to database
// //         const videoCall = await VideoCall.create({
// //             caller: callerId,
// //             receiver: receiverId,
// //             status: 'initiated'
// //         });
// //         res.status(200).json({ message: 'Video call initiated', data: videoCall });
// //     } catch (error) {
// //         console.error('Error initiating video call:', error);
// //         res.status(500).json({ error: 'Failed to initiate video call' });
// //     }
// // };

// // // Initiate audio call controller function
// // const initiateAudioCall = async (req, res) => {
// //     const { callerId, receiverId } = req.body;
// //     try {
// //         // Save audio call details to database
// //         const audioCall = await AudioCall.create({
// //             caller: callerId,
// //             receiver: receiverId,
// //             status: 'initiated'
// //         });
// //         res.status(200).json({ message: 'Audio call initiated', data: audioCall });
// //     } catch (error) {
// //         console.error('Error initiating audio call:', error);
// //         res.status(500).json({ error: 'Failed to initiate audio call' });
// //     }
// // };







// // const Conversation = require("../modules/conversation")

// // const newConversation = async (req,res) =>{
// //     try{
// //         const userId = req.body;
// //         const friendId = req.params.friendId;

// //         const exist = await Conversation.findOne({members:{$all:[friendId, userId]}})
// //          if(exist){
// //              return res.status(200).json('conversation already exist');
// //          }

// //          const newconversation = new Conversation({
// //              members:[userId,friendId]
// //          })
// //          await newconversation.save();
// //          return res.status(200).json('conversation saved successfully');
// //     }catch(error){
// //         return res.status(500).json(error.message);
// //     }
// // }






































// // module.exports = {
// //     sendMessage,
// //     initiateVideoCall,
// //     initiateAudioCall
// // };





// // // // controllers/messageController.js
// // // const Message = require('../modules/messages');

// // // // Controller to send a message
// // // exports.sendMessage = async (req, res) => {
// // //   try {
// // //     const { sender, recipient, text } = req.body;
// // //     const message = new Message({ sender, recipient, text });
// // //     await message.save();
// // //     res.status(201).json({ message: 'Message sent successfully' });
// // //   } catch (error) {
// // //     console.error('Error sending message:', error);
// // //     res.status(500).json({ message: 'Failed to send message' });
// // //   }
// // // };

// // // // Controller to retrieve messages between two users
// // // exports.getMessages = async (req, res) => {
// // //   try {
// // //     const { userId, friendId } = req.params;
// // //     const messages = await Message.find({
// // //       $or: [
// // //         { sender: userId, recipient: friendId },
// // //         { sender: friendId, recipient: userId },
// // //       ],
// // //     }).sort('timestamp');
// // //     res.status(200).json({ messages });
// // //   } catch (error) {
// // //     console.error('Error fetching messages:', error);
// // //     res.status(500).json({ message: 'Failed to fetch messages' });
// // //   }
// // // };







// // // // const Message = require('../modules/messages');

// // // // const sendMessage = async (senderId, receiverId, text) => {
// // // //   try {
// // // //     const message = new Message({
// // // //       sender: senderId,
// // // //       receiver: receiverId,
// // // //       text: text,
// // // //     });
// // // //     await message.save();
// // // //     return message;
// // // //   } catch (error) {
// // // //     console.error('Error sending message:', error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // module.exports = { sendMessage };















// // // backend/routes/messageRoutes.js
// // const express = require('express');
// // const Message = require('../models/Message');
// // const router = express.Router();

// // // Send message
// // router.post('/send', async (req, res) => {
// //   const { sender, receiver, content } = req.body;
// //   const message = new Message({ sender, receiver, content });
// //   await message.save();
// //   res.status(201).send(message);
// // });

// // // Get messages between two users
// // router.get('/:userId/:friendId', async (req, res) => {
// //   const { userId, friendId } = req.params;
// //   const messages = await Message.find({
// //     $or: [
// //       { sender: userId, receiver: friendId },
// //       { sender: friendId, receiver: userId },
// //     ],
// //   }).sort({ timestamp: 1 });
// //   res.status(200).send(messages);
// // });

// // module.exports = router;



// const Message = require('../modules/messages');

// const sendMessage = async(req, res) => {
//     const { sender, receiver, content } = req.body;
//       const message = new Message({ sender, receiver, content });
//       await message.save();
//       res.status(201).send(message);
// }

// const getMessages = async(req,res) =>{
//       const { userId, friendId } = req.params;
//   const messages = await Message.find({
//     $or: [
//       { sender: userId, receiver: friendId },
//       { sender: friendId, receiver: userId },
//     ],
//   }).sort({ timestamp: 1 });
//   res.status(200).send(messages);
// }

// module.exports = { sendMessage ,getMessages}


















const ChatModel = require("../modules/conversation");
const MessageModel = require("../modules/messages");

const createChat = async(req,res) => {

    const newChat = new ChatModel({
        members: [req.body.userId, req.body.friendId]
    });
    try{
        const result = await newChat.save();
        res.status(200).json(result);
        
    }catch(error){
        res.status(500).json(error)
    }
};



const userChats = async(req,res) => {
    try{
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)

    }catch(error){
        res.status(500).json(error)
    }
}


const findChat = async(req,res) => {
    try{
        const chat = await ChatModel.findOne({
            members: {$all:[req.params.userId, req.params.friendId]}
        })
        res.status(200).json(chat) 
    }catch(error){
        res.status(500).json(error)
    }
}


const addMessage = async(req,res) => {
    const {chatId, userId, text} = req.body
    const message = new MessageModel({
        chatId,
        userId,
        text
    });
    try{
        const result = await message.save();
        res.status(200).json(result);  
    }catch(error){
        res.status(500).json(error)
    }

}

const getMessage = async(req,res) =>{
    const {chatId} = req.params;
    try{
        const result = await MessageModel.find({chatId});
        res.status(200).json(result);

    }catch(error){
        res.status(500).json(error)
    }
}





module.exports = { createChat ,userChats, findChat,addMessage, getMessage}