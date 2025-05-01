import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Job from './Job';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/saved`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Error fetching saved jobs');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchSavedJobs();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Please login to view saved jobs
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Saved Jobs ({savedJobs.length})
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    </div>
                ) : savedJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                            No saved jobs yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Browse jobs and save the ones you're interested in
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map((savedJob) => (
                            <motion.div
                                key={savedJob._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Job job={savedJob.job} isSavedPage={true} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedJobs;