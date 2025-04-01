dotenv.config(); // Ensure this is called at the top
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// Route
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I AM COMING FROM BACKEND",
    success: true,
  });
});

connectDB();

const port = process.env.PORT || 3000;
//api's
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
