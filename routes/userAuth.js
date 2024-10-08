const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "bookstore123", (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid or expired token, please sign in again" });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
