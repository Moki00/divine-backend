const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
