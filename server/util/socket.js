// // socket.js

// const socketIO = require('socket.io');

// let io;
// const users = {}; // In-memory store for users

// const socketConnection = (server) => {
//     io = socketIO(server);

//     io.on('connection', (socket) => {
//         console.log('New Connection');

//         socket.on('joined', async ({ token }) => {
//             try {
//                 const decoded = jwt.verify(token, 'your_jwt_secret');
//                 const user = await User.findById(decoded.userId);
//                 if (user) {
//                     users[socket.id] = user;
//                     console.log(`${user.username} has joined`);
//                     socket.broadcast.emit('userJoined', {
//                         user: 'Admin',
//                         message: `${user.username} has joined`,
//                     });
//                     socket.emit('welcome', {
//                         user: 'Admin',
//                         message: `Welcome to the chat, ${user.username}`,
//                     });
//                 } else {
//                     socket.emit('error', { message: 'User not found' });
//                 }
//             } catch (error) {
//                 socket.emit('error', { message: 'Authentication error' });
//             }
//         });

//         socket.on('sendInterest', async ({ fromUserId, toUserId, message }) => {
//             try {
//                 const interest = new Interest({ fromUserId, toUserId, message });
//                 await interest.save();
//                 io.to(users[toUserId]).emit('interestReceived', {
//                     from: fromUserId,
//                     message: message,
//                 });
//             } catch (error) {
//                 socket.emit('error', { message: 'Error sending interest' });
//             }
//         });

//         socket.on('acceptInterest', async ({ fromUserId, toUserId }) => {
//             try {
//                 io.to(users[fromUserId]).emit('interestAccepted', {
//                     from: toUserId,
//                     message: 'Interest accepted',
//                 });
//             } catch (error) {
//                 socket.emit('error', { message: 'Error accepting interest' });
//             }
//         });

//         socket.on('sendMessage', ({ message, toUserId }) => {
//             const fromUser = users[socket.id];
//             if (fromUser) {
//                 io.to(users[toUserId]).emit('receiveMessage', {
//                     user: fromUser.username,
//                     message: message,
//                 });
//             } else {
//                 socket.emit('error', { message: 'User not authenticated' });
//             }
//         });

//         socket.on('disconnect', () => {
//             if (users[socket.id]) {
//                 socket.broadcast.emit('leave', {
//                     user: 'Admin',
//                     message: `${users[socket.id].username} has left`,
//                 });
//                 console.log(`${users[socket.id].username} has left`);
//                 delete users[socket.id];
//             }
//         });
//     });
// };

// module.exports = { socketConnection };



const {jwtDecode} = require('jwt-decode');
const { authMiddleware } = require('../middleware/authMiddleware');








// const initializeSocket = (io) => {
//   // Use the authentication middleware for Socket.io connections
//   io.use(authMiddleware);

//   io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.userId}`);

//     socket.on('join', ({ token }) => {
//       // Handle user joining with token
//       console.log(`User joined with token: ${token}`);
//     });

//     socket.on('sendMessage', async ({ message, recipientId }) => {
//       try {
//         // Save message to database or handle as needed
//         const senderId = socket.userId;
//         // Broadcast message to recipient
//         socket.to(recipientId).emit('receiveMessage', { senderId, message });
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log(`User disconnected: ${socket.userId}`);
//     });
//   });
// };

// module.exports = { initializeSocket };
// const { authMiddleware } = require('./authMiddleware');
const users = {}; // To store connected users

const initializeSocket = (io) => {
  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);
    users[socket.userId] = socket;

    socket.on('join', ({ token }) => {
      console.log(`User joined with token: ${token}`);
    });

    socket.on('sendMessage', ({ message, recipientId }) => {
      if (users[recipientId]) {
        users[recipientId].emit('receiveMessage', { senderId: socket.userId, message });
      }
    });

    socket.on('callUser', (data) => {
      if (users[data.userToCall]) {
        users[data.userToCall].emit('receiveCall', {
          signal: data.signal,
          from: data.from,
          name: data.name,
          isVideo: data.isVideo,
        });
      }
    });

    socket.on('answerCall', (data) => {
      if (users[data.to]) {
        users[data.to].emit('callAccepted', data.signal);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      delete users[socket.userId];
    });
  });
};

module.exports = { initializeSocket };
