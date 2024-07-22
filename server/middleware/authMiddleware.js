const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const asyncHandler = require('express-async-handler');
const User = require('../modules/userModel');

//middleware for checking user authorization
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});




const authMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        socket.userId = decodedToken.userId; // Attach user ID to socket object
        return next();
      } catch (error) {
        console.error('Invalid token:', error);
        return next(new Error('Authentication error'));
      }
    }
    return next(new Error('Authentication error'));
  };

module.exports = { protect,authMiddleware };
