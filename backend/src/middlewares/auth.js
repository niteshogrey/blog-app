const jwt = require('jsonwebtoken');

const authanticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Corrected to `req.user`
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authanticateToken;
