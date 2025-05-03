import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                if (!user) return; // Don't make the API call if user is not logged in
                
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                if (error.response?.status === 401) {
                    toast.error('Please login to view jobs');
                } else {
                    toast.error('Failed to load jobs');
                }
            }
        };
        fetchAllJobs();
    }, [searchedQuery, user, dispatch]);
};

export default useGetAllJobs;