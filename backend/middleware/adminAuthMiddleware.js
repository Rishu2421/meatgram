const jwt = require('jsonwebtoken');

const adminAuthMiddleware = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // Token verification failed
      console.log(decoded);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the decoded token contains admin-specific information (e.g., isAdmin: true)
    // You can customize this based on how you structure your JWT payload
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Admin authentication passed, allow the request to proceed
    next();
  });
};

module.exports = adminAuthMiddleware;
