import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL;
        if (!uri) {
            throw new Error("MONGO_URL is not defined in the environment variables");
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("Error in connectDB:", error);
    }
};

export default connectDB;