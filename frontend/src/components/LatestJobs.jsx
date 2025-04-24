import React from 'react';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import JobCard from './JobCard';

const LatestJobs = () => {
    const { jobs = [] } = useSelector(store => store.job);
    useGetAllJobs();

    return (
        <div className="max-w-7xl mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">Latest Jobs ({jobs?.length || 0})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs?.slice(0, 6)?.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default LatestJobs;