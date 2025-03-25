const jwt = require("jsonwebtoken");

const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET || "bookstore@123", (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        const newToken = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET || "bookstore@123", { expiresIn: '15m' });
        res.json({ accessToken: newToken });
    });

};

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "bookstore@123", (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid or expired token, please sign in again" });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken, refreshToken };
