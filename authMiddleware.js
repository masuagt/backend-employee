const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = { id: payload.userId }; // Attach the user ID to the request
    next();
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = authMiddleware;