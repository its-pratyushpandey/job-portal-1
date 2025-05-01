import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import uploadRoute from "./routes/upload.js";
import helmet from "helmet";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import verifyToken from './middlewares/verifyToken.js';  // Correct import

dotenv.config({});

// Ensure required environment variables are set
const requiredEnvVars = [
  ["PORT", "3000"],
  ["MONGO_URI", undefined],
  ["JWT_SECRET", undefined],
  ["NODE_ENV", "development"],
  ["CLOUDINARY_CLOUD_NAME", undefined],
  ["CLOUDINARY_API_KEY", undefined],
  ["CLOUDINARY_API_SECRET", undefined],
];

requiredEnvVars.forEach(([envVar, defaultValue]) => {
  if (!process.env[envVar]) {
    if (defaultValue !== undefined) {
      process.env[envVar] = defaultValue;
      console.log(`Using default value for ${envVar}: ${defaultValue}`);
    } else {
      console.error(`Error: ${envVar} environment variable is required`);
      process.exit(1);
    }
  }
});

// Optional: test DB connection and exit
const checkDBConnection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection test successful");
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
  maxAge: 600,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1", uploadRoute);

// ✅ JWT Protected Test Route
app.get("/api/v1/test/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Something went wrong!",
    success: false,
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

// Start server
const startServer = async () => {
  try {
    const dbConnected = await connectDB();
    if (!dbConnected) {
      throw new Error("Database connection failed");
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
