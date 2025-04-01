import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure req.user._id is used
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job id is required"
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                success: false,
                message: "Job not found"
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure req.user._id is used
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            },
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found"
            });
        }

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Admin dekhega kitne user ne apply kiya
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        // Find the application by application id
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Status updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};