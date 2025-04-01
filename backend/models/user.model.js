import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        skills: {
            type: [String] // Define skills as an array of strings
        },
        resume: {
            type: String
        },
        resumeOriginalName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);