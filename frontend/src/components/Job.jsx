import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useSelector } from 'react-redux';

const Job = ({ job, isSavedPage = false }) => {
    const [saving, setSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(isSavedPage);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    };

    const handleSaveJob = async () => {
        if (!user) {
            toast.error("Please login to save jobs");
            navigate("/login");
            return;
        }

        try {
            setSaving(true);
            const res = await axios.post(`${JOB_API_END_POINT}/save`, 
                { jobId: job._id },
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsSaved(res.data.isSaved);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error saving job');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="ghost" 
                    className={`rounded-full text-slate-400 dark:text-slate-500 hover:text-purple-500 dark:hover:text-purple-400 ${saving ? 'opacity-50' : ''}`}
                    size="icon"
                    onClick={handleSaveJob}
                    disabled={saving}
                >
                    <Bookmark className={isSaved ? 'fill-purple-500 dark:fill-purple-400' : ''} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6 dark:bg-gray-700 dark:border-gray-600" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg text-gray-900 dark:text-white'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 text-gray-900 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100" variant="secondary">
                    {job?.position} Positions
                </Badge>
                <Badge className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100" variant="secondary">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-100" variant="secondary">
                    {job?.salary} LPA
                </Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    View Details
                </Button>
                {!isSaved && (
                    <Button 
                        onClick={handleSaveJob}
                        disabled={saving}
                        className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
                    >
                        {saving ? 'Saving...' : 'Save Job'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Job;