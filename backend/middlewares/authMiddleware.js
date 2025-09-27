import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.json({success: false, message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.json({success: false, message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach payload to request (example: user/admin info)
    req.admin = decoded;

    next(); // move to the next middleware/controller
  } catch (error) {
    return res.json({success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
