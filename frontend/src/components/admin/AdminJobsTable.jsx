import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { 
    Edit2, Eye, MoreHorizontal, Briefcase, Calendar, Users, Clock,
    MapPin, DollarSign, Award, Star, Archive, Trash2, TrendingUp,
    Bell, Mail, Download, Share2, Bookmark, Shield, ChartBar,
    CheckCircle2, AlertCircle, Building2, GraduationCap, Plus,
    FileSpreadsheet, Filter, RefreshCcw, Settings, Search, BarChart2,
    PieChart, TrendingDown, UserCheck, Target, Zap, Sparkles,
    BellRing, X
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { format } from 'date-fns'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell
} from 'recharts'

const AdminJobsTable = () => { 
    const dispatch = useDispatch();
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [selectedView, setSelectedView] = useState('all');
    const [timeRange, setTimeRange] = useState('week');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New application received for Senior Developer position', time: '5m ago', unread: true },
        { id: 2, text: 'Interview scheduled for Product Manager role', time: '1h ago', unread: true },
        { id: 3, text: 'Application status updated for UI Designer', time: '2h ago', unread: false }
    ]);
    const [showSettings, setShowSettings] = useState(false);
    const [settingsOptions, setSettingsOptions] = useState({
        emailNotifications: true,
        pushNotifications: true,
        darkMode: false,
        autoArchive: false
    });
    const navigate = useNavigate();

    // Mock data for charts
    const applicationTrends = [
        { name: 'Mon', applications: 4 },
        { name: 'Tue', applications: 6 },
        { name: 'Wed', applications: 8 },
        { name: 'Thu', applications: 12 },
        { name: 'Fri', applications: 9 },
        { name: 'Sat', applications: 5 },
        { name: 'Sun', applications: 3 }
    ];

    const jobCategories = [
        { name: 'Development', value: 45 },
        { name: 'Design', value: 25 },
        { name: 'Marketing', value: 20 },
        { name: 'Management', value: 10 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => { 
        filterJobsList();
    }, [allAdminJobs, searchQuery, statusFilter, searchJobByText]);

    const filterJobsList = () => {
        let filtered = [...allAdminJobs];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(job => 
                job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(job => {
                switch (statusFilter) {
                    case 'active':
                        return job.status === 'active';
                    case 'paused':
                        return job.status === 'paused';
                    case 'closed':
                        return job.status === 'closed';
                    default:
                        return true;
                }
            });
        }

        // Search by text from Redux
        if (searchJobByText) {
            filtered = filtered.filter(job =>
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        }

        setFilterJobs(filtered);
    };

    const markNotificationRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, unread: false } : notif
            )
        );
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const updateSettings = (key) => {
        setSettingsOptions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const getJobStatusColor = (applications = 0) => {
        if (applications > 20) return 'bg-gradient-to-r from-green-500 to-green-600';
        if (applications > 10) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }

    const getJobPriorityBadge = (applications = 0) => {
        if (applications > 20) return (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Sparkles className="w-3 h-3 mr-1" /> High Demand
            </Badge>
        );
        if (applications > 10) return (
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" /> Growing
            </Badge>
        );
        return (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Target className="w-3 h-3 mr-1" /> New
            </Badge>
        );
    }

    const getDashboardStats = () => {
        const totalApplications = filterJobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);
        const activeJobs = filterJobs.length;
        const avgApplications = Math.round(totalApplications / activeJobs) || 0;
        return { totalApplications, activeJobs, avgApplications };
    }

    const stats = getDashboardStats();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
        >
            {/* Enhanced Dashboard Header */}
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl shadow-lg">
                            <Briefcase className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Recruiter Dashboard
                            </h2>
                            <p className="text-gray-500 flex items-center">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Streamline your recruitment process
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 
                                     bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                            <RefreshCcw className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl
                                     flex items-center space-x-2 shadow-lg hover:shadow-blue-500/30 transition-all"
                            onClick={() => navigate('/admin/jobs/create')}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="font-medium">Post New Job</span>
                        </motion.button>
                    </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Active Jobs</p>
                                <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
                                <p className="text-green-500 text-sm flex items-center mt-1">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +12% this week
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Briefcase className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Applications</p>
                                <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
                                <p className="text-green-500 text-sm flex items-center mt-1">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +5% this week
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Avg. Applications</p>
                                <h3 className="text-2xl font-bold">{stats.avgApplications}</h3>
                                <p className="text-yellow-500 text-sm flex items-center mt-1">
                                    <TrendingUp className="w-4 h-4 mr-1" /> Stable
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <ChartBar className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Time to Hire</p>
                                <h3 className="text-2xl font-bold">15 Days</h3>
                                <p className="text-red-500 text-sm flex items-center mt-1">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +2 days
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Clock className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Analytics Section with Working Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold flex items-center">
                                <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
                                Application Trends
                            </h3>
                            <Select defaultValue="weekly">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select view" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={applicationTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Area 
                                    type="monotone" 
                                    dataKey="applications" 
                                    stroke="#2563eb" 
                                    fill="url(#colorApplications)" 
                                />
                                <defs>
                                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold flex items-center">
                                <PieChart className="w-5 h-5 mr-2 text-purple-500" />
                                Job Categories
                            </h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsPieChart>
                                <Pie
                                    data={jobCategories}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {jobCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Enhanced Quick Actions with Working Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search jobs..."
                                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Jobs</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="paused">Paused</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-gray-100 relative">
                                                <Bell className="w-4 h-4" />
                                                {notifications.some(n => n.unread) && (
                                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                                                )}
                                            </Badge>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-0">
                                            <div className="p-4 border-b border-gray-100">
                                                <h3 className="font-semibold">Notifications</h3>
                                            </div>
                                            <div className="max-h-[300px] overflow-y-auto">
                                                {notifications.map(notif => (
                                                    <div 
                                                        key={notif.id}
                                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                                            notif.unread ? 'bg-blue-50' : ''
                                                        }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <p className="text-sm">{notif.text}</p>
                                                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => removeNotification(notif.id)}
                                                                className="text-gray-400 hover:text-gray-600"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        {notif.unread && (
                                                            <button
                                                                onClick={() => markNotificationRead(notif.id)}
                                                                className="text-xs text-blue-500 mt-2 hover:text-blue-600"
                                                            >
                                                                Mark as read
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TooltipTrigger>
                                <TooltipContent>Notifications</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-gray-100">
                                                <Settings className="w-4 h-4" />
                                            </Badge>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="p-4 space-y-4">
                                                <h3 className="font-semibold">Dashboard Settings</h3>
                                                <div className="space-y-3">
                                                    {Object.entries(settingsOptions).map(([key, value]) => (
                                                        <div key={key} className="flex items-center justify-between">
                                                            <span className="text-sm capitalize">
                                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                                            </span>
                                                            <button
                                                                onClick={() => updateSettings(key)}
                                                                className={`w-10 h-5 rounded-full transition-colors ${
                                                                    value ? 'bg-blue-500' : 'bg-gray-200'
                                                                }`}
                                                            >
                                                                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                                                    value ? 'translate-x-5' : 'translate-x-1'
                                                                }`} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TooltipTrigger>
                                <TooltipContent>Settings</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Enhanced Jobs Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                    <Table>
                        <TableCaption className="text-base font-medium">
                            Your Active Job Listings
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-700">
                                <TableHead className="font-semibold">Company</TableHead>
                                <TableHead className="font-semibold">Position</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Posted Date</TableHead>
                                <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filterJobs?.map((job) => (
                                <motion.tr
                                    key={job._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                                    className="border-b border-gray-100 dark:border-gray-700"
                                >
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{job?.company?.name}</p>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <MapPin className="w-3 h-3 mr-1" /> {job?.location}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="font-medium">{job?.title}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Badge variant="outline" className="flex items-center">
                                                    <DollarSign className="w-3 h-3 mr-1" />
                                                    {job?.salary} LPA
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {job?.jobType}
                                                </Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getJobPriorityBadge(job?.applications?.length)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{new Date(job?.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <TooltipProvider>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </motion.button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2">
                                                    <div className="space-y-2">
                                                        <motion.div
                                                            whileHover={{ x: 5 }}
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                        >
                                                            <Users className="w-4 h-4 text-blue-500" />
                                                            <span>View Applicants</span>
                                                        </motion.div>
                                                        <motion.div
                                                            whileHover={{ x: 5 }}
                                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-green-500" />
                                                            <span>Edit Listing</span>
                                                        </motion.div>
                                                        <motion.div
                                                            whileHover={{ x: 5 }}
                                                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                        >
                                                            <Archive className="w-4 h-4 text-yellow-500" />
                                                            <span>Archive Job</span>
                                                        </motion.div>
                                                        <motion.div
                                                            whileHover={{ x: 5 }}
                                                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer text-red-500"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </motion.div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TooltipProvider>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </div>
        </motion.div>
    )
}

const AppliedJobTable = ({ appliedJobs }) => {
    return (
        <div>
            <Table>
                <TableCaption>Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobs?.length > 0 ? (
                        appliedJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{new Date(job.appliedDate).toLocaleDateString()}</TableCell>
                                <TableCell>{job.status}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No applications found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
export { AppliedJobTable };