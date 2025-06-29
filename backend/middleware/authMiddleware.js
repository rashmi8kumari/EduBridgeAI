const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findById(decoded.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // ✅ Full user object available in request
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ msg: "Token verification failed" });
  }
};

module.exports = protect;


