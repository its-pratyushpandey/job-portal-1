import { Job } from "../models/job.model.js";

// Admin post karega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.user._id; // Ensure req.user._id is used
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job created successfully",
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Student ke liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"

        }).sort({ createdAt: -1 });


        if (!jobs || jobs.length === 0) {
            return res.status(200).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
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

// Admin kitne job create kara abhi tak
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user._id; // Ensure req.user._id is used
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};