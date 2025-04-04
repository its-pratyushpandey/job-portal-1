import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, phoneNumber, password: hashedPassword, role });
        return res.status(201).json({ message: "Account created successfully", success: true });

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist with this email", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        // Check if role is correct
        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role", success: false });
        }

        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ message: `Welcome back ${user.fullname}`, user: userData, success: true });

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const logout = (req, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, email, bio, skills } = req.body;
        const file = req.file;

        // cloudinary aayega idhar..
 

        let skillsArray;
        if (skills) {
          skillsArray = skills.split(",");
        }

        const userId = req.user._id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (fullname) user.fullname = fullname
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (email) user.email = email
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume later comes here..

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({ message: "Profile updated successfully", user, success: true });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
