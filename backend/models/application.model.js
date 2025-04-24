import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required'],
        validate: {
            validator: async function(v) {
                const Job = mongoose.model('Job');
                const job = await Job.findById(v);
                return job ? true : false;
            },
            message: 'Invalid Job ID'
        }
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Applicant ID is required'],
        validate: {
            validator: async function(v) {
                const User = mongoose.model('User');
                const user = await User.findById(v);
                return user ? true : false;
            },
            message: 'Invalid User ID'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'accepted', 'rejected'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    }
}, { timestamps: true });

// Add error handling middleware
applicationSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new Error('Invalid application data'));
    } else {
        next(error);
    }
});

export const Application = mongoose.model("Application", applicationSchema);