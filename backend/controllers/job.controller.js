import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        // Enhanced validation
        if (!title?.trim() || !description?.trim() || !requirements || !salary || !location?.trim() || 
            !jobType?.trim() || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
                missingFields: Object.entries({ title, description, requirements, salary, location, 
                    jobType, experience, position, companyId })
                    .filter(([_, value]) => !value)
                    .map(([key]) => key)
            });
        }

        // Validate numeric fields
        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({
                message: "Invalid salary value",
                success: false
            });
        }

        if (isNaN(position) || position <= 0) {
            return res.status(400).json({
                message: "Invalid position value",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: req.id
        });

        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating job",
            success: false,
            error: error.message
        });
    }
}

// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ created_by: recruiterId })
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
          select: 'fullname email profile'
        }
      })
      .populate('company')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error('Get recruiter jobs error:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recruiter jobs"
    });
  }
};

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        console.log('Delete job request:', {
            jobId,
            userId,
            user: req.user,
            headers: req.headers
        });

        // Find the job and check if it exists
        const job = await Job.findById(jobId).populate('created_by');
        
        if (!job) {
            console.log('Job not found:', jobId);
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        console.log('Found job:', {
            jobId: job._id,
            createdBy: job.created_by?._id,
            userId: userId,
            match: job.created_by?._id?.toString() === userId
        });

        // Check if the user is authorized to delete this job
        if (!job.created_by || job.created_by._id.toString() !== userId) {
            console.log('Authorization failed:', {
                jobCreator: job.created_by?._id,
                userId: userId,
                match: job.created_by?._id?.toString() === userId
            });
            
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job. Only the job creator can delete it."
            });
        }

        // Delete the job
        const deletedJob = await Job.findByIdAndDelete(jobId);
        
        if (!deletedJob) {
            console.log('Failed to delete job:', jobId);
            return res.status(500).json({
                success: false,
                message: "Failed to delete job"
            });
        }

        console.log('Job deleted successfully:', jobId);
        return res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.error('Delete job error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return res.status(500).json({
            success: false,
            message: "Error deleting job",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};