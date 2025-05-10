import { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

export const useRecruiterStats = (timeRange = '30') => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateStats = async () => {
    try {
      setLoading(true);
      // Get recruiter's jobs and applications
      const jobsResponse = await axios.get(`${USER_API_END_POINT}/recruiter/jobs`, {
        withCredentials: true
      });

      const jobs = jobsResponse.data.jobs || [];
      const activeJobs = jobs.filter(job => job.status === 'active');
      const allApplications = jobs.flatMap(job => job.applications || []);
      
      // Calculate total hires
      const totalHires = allApplications.filter(app => app.status === 'hired').length;
      
      // Calculate response rate
      const respondedApplications = allApplications.filter(app => 
        ['shortlisted', 'interviewed', 'hired', 'rejected'].includes(app.status)
      );
      const responseRate = allApplications.length > 0 
        ? Math.round((respondedApplications.length / allApplications.length) * 100)
        : 0;

      // Calculate average time to hire
      const hiredApplications = allApplications.filter(app => app.status === 'hired');
      const avgTimeToHire = hiredApplications.length > 0
        ? Math.round(hiredApplications.reduce((sum, app) => {
            const hireDate = new Date(app.updatedAt);
            const applyDate = new Date(app.createdAt);
            return sum + (hireDate - applyDate) / (1000 * 60 * 60 * 24); // Convert to days
          }, 0) / hiredApplications.length)
        : 0;

      // Get recent activity
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeRange));
      
      const recentApplications = allApplications.filter(app => 
        new Date(app.createdAt) >= startDate
      );
      
      const recentHires = hiredApplications.filter(app => 
        new Date(app.updatedAt) >= startDate
      );

      // Calculate job categories distribution
      const jobCategories = jobs.reduce((acc, job) => {
        const category = job.category || 'Other';
        if (!acc[category]) acc[category] = { total: 0, active: 0, applications: 0, hires: 0 };
        acc[category].total++;
        if (job.status === 'active') acc[category].active++;
        acc[category].applications += job.applications?.length || 0;
        acc[category].hires += job.applications?.filter(app => app.status === 'hired').length || 0;
        return acc;
      }, {});

      // Calculate monthly trends
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
      }).reverse();

      const monthlyStats = last6Months.map(month => {
        const monthApplications = allApplications.filter(app => {
          const appDate = new Date(app.createdAt);
          return appDate.toLocaleString('default', { month: 'short', year: 'numeric' }) === month;
        });

        return {
          month,
          applications: monthApplications.length,
          hires: monthApplications.filter(app => app.status === 'hired').length
        };
      });

      setStats({
        overview: {
          totalJobs: jobs.length,
          activeJobs: activeJobs.length,
          totalHires,
          totalApplications: allApplications.length,
          responseRate,
          avgTimeToHire,
          applicationToInterviewRate: Math.round(
            (allApplications.filter(app => app.status === 'interviewed').length / allApplications.length) * 100
          )
        },
        recentActivity: {
          last30DaysApplications: recentApplications.length,
          last30DaysHires: recentHires.length,
          applicationTrend: allApplications.length > 0 
            ? ((recentApplications.length / allApplications.length) * 100).toFixed(1)
            : 0
        },
        monthlyStats,
        jobCategories
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch statistics';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching recruiter stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateStats();
    // Auto-refresh stats every 5 minutes
    const interval = setInterval(calculateStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeRange]);

  return { stats, loading, error, refetchStats: calculateStats };
};