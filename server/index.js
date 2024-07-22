const express = require('express');

const http = require('http');
const socketIo = require('socket.io');

const dotenv = require('dotenv');
const cors = require("cors");
const userRoutes = require('./routers/userRoutes');
const userEducation = require('./routers/userEducation')
const postRoutes = require('./routers/postRoutes');
const commentRoutes = require('./routers/commentRoutes')
const UserSearching = require('./routers/searchRouter')
// const UserCommunicatio = require('./routers/communicationRouter')
const UserCommunicatio = require('./routers/communicationRouter')

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = socketIo(server);





const fileUpload = require('express-fileupload');

const colors = require("colors");
const { cloudnairyconnect } = require("./config/cloudinary");
const database = require('./config/db');






app.use(express.json()); 

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use(cors({
    origin: '*'
}));

app.use('/api/user', userRoutes);
app.use('/api/education', userEducation);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/usersearch',UserSearching);

app.use('/api/message', UserCommunicatio)






// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });

//   // Handle WebRTC signaling
//   socket.on('offer', (payload) => {
//     io.to(payload.target).emit('offer', payload);
//   });

//   socket.on('answer', (payload) => {
//     io.to(payload.target).emit('answer', payload);
//   });

//   socket.on('ice-candidate', (payload) => {
//     io.to(payload.target).emit('ice-candidate', payload);
//   });
// });


io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    io.to(message.friendId).emit('receiveMessage', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



app.get('/', (req, res) => {
    res.send('API is running');
});
cloudnairyconnect();
database.connect();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`.green.bold)
});
























