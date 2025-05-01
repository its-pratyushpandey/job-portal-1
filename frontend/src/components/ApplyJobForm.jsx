import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const ApplyJobForm = ({ jobId, onClose }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    experience: '',
    coverLetter: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[95%] max-w-lg space-y-4 relative"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Apply for this Job</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-2 rounded border"
          required
        />
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={form.coverLetter}
          onChange={handleChange}
          className="w-full p-2 rounded border"
          rows={4}
          required
        />
        <input
          type="file"
          name="resume"
          accept=".pdf"
          onChange={handleChange}
          className="w-full"
          required
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="text-red-600 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJobForm;
