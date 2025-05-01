import SavedJob from "../models/savedJob.model.js";
import { Job } from "../models/job.model.js";

export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Check if already saved
        const existingSave = await SavedJob.findOne({ user: userId, job: jobId });
        if (existingSave) {
            // If already saved, remove it (toggle functionality)
            await SavedJob.findByIdAndDelete(existingSave._id);
            return res.status(200).json({
                success: true,
                message: "Job removed from saved jobs",
                isSaved: false
            });
        }

        // Save the job
        await SavedJob.create({
            user: userId,
            job: jobId
        });

        return res.status(200).json({
            success: true,
            message: "Job saved successfully",
            isSaved: true
        });

    } catch (error) {
        console.error("Save job error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const savedJobs = await SavedJob.find({ user: userId })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        return res.status(200).json({
            success: true,
            savedJobs
        });

    } catch (error) {
        console.error("Get saved jobs error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};