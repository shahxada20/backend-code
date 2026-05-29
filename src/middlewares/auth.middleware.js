const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');


const protectRoute = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ message: "Not authorized, please login first!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, user not found!" });
        }
        next();

    } catch (error) {
        return res.status(401).json({ message: "Not authorized, invalid or expired token." });
    }
}

module.exports = protectRoute;