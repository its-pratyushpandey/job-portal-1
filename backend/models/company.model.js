import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company name is required"],
        unique: true,
        trim: true,
        minLength: [2, "Company name must be at least 2 characters"],
        maxLength: [50, "Company name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [1000, "Description cannot exceed 1000 characters"]
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: "Please enter a valid website URL"
        }
    },
    location: {
        type: String,
        trim: true
    },
    logo: {
        type: String,
        default: "https://default-company-logo.png" // Add your default logo URL
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes for better query performance
companySchema.index({ name: 1 });
companySchema.index({ userId: 1 });

// Add a pre-save middleware to handle any pre-save operations
companySchema.pre('save', async function(next) {
    // Add any pre-save logic here
    next();
});

// Add instance methods if needed
companySchema.methods.toPublicJSON = function() {
    const company = this.toObject();
    delete company.__v;
    return company;
};

export const Company = mongoose.model("Company", companySchema);