const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;  // Store userId in request
    next();
    console.log('Received token:', token);

  } catch (err) {
    console.error('JWT Verify Error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
  
}

module.exports = auth;
