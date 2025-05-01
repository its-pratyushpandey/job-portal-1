// controllers/applicationController.js
const Job = require('../models/Job');
const Application = require('../models/Application');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { fullName, email, experience, coverLetter } = req.body;
    const applicant = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const existingApplication = await Application.findOne({ job: jobId, applicant });
    if (existingApplication) return res.status(400).json({ success: false, message: 'Already applied' });

    let resumeUrl = '';
    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.buffer, 'resumes');
      resumeUrl = uploadRes.secure_url;
    }

    const application = new Application({
      job: jobId,
      applicant,
      fullName,
      email,
      experience,
      coverLetter,
      resume: resumeUrl,
    });

    await application.save();
    job.applications.push({ applicant });
    await job.save();

    res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
