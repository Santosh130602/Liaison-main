const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const userRoutes = require('./routers/userRoutes');
const userEducation = require('./routers/userEducation')
const postRoutes = require('./routers/postRoutes');
const commentRoutes = require('./routers/commentRoutes')
const UserSearching = require('./routers/searchRouter')

const fileUpload = require('express-fileupload');

const colors = require("colors");
const { cloudnairyconnect } = require("./config/cloudinary");
const database = require('./config/db');

dotenv.config();
const app = express();

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

// app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running');
});
cloudnairyconnect();
database.connect();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`.green.bold)
});

