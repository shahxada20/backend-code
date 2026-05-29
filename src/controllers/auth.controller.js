const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.configureSalt ? await bcrypt.genSalt(10) : await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ username, email, password: hashedPassword });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        newUser.password = undefined;
        
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({ message: "User registered successfully!", user: newUser });

    } catch (err) { next(err); }
}



const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        user.password = undefined;
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

        return res.status(200).json({ message: "User logged in successfully!", user, token });

    } catch (err) { next(err); }
}


module.exports = {
    registerUser,
    loginUser
}