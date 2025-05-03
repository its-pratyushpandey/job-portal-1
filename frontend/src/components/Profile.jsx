import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { 
    Contact, 
    Mail, 
    Pen, 
    Briefcase, 
    GraduationCap, 
    MapPin, 
    Calendar,
    Github, 
    Linkedin,
    Globe,
    Download,
    Star,
    Award,
    Clock,
    Trophy,
    Medal,
    Sparkles,
    BookOpen,
    Rocket,
    Target,
    Users,
    Heart,
    CheckCircle2,
    Phone,
    Link as LinkIcon,
    FileText,
    MessageCircle,
    Share2,
    User2,
    Twitter,
    Copy,
    Building,
    MapPinned,
    Bookmark,
    Crown,
    Gem,
    Laptop,
    ShieldCheck,
    Presentation,
    Activity,
    Coins,
    Zap,
    ArrowRight,
    ArrowUpRight,
    Loader2,
    Building2,
    LineChart,
    BriefcaseIcon,
    PieChart,
    TrendingUp,
    UserCheck,
    BarChart2,
    Plus,
    TrendingDown
} from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

const RecruiterStatsCard = ({ icon: Icon, label, value, trend, trendValue, gradient }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${gradient}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                {trend && (
                    <p className={`text-sm flex items-center gap-1 ${
                        trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {trendValue}
                    </p>
                )}
            </div>
        </div>
    </motion.div>
);

const RecruiterMetrics = () => {
    const metrics = [
        {
            label: "Active Job Posts",
            value: "12",
            trend: "up",
            trendValue: "+3 this month",
            icon: BriefcaseIcon,
            gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            label: "Total Applications",
            value: "248",
            trend: "up",
            trendValue: "+15% vs last month",
            icon: Users,
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600"
        },
        {
            label: "Hire Rate",
            value: "68%",
            trend: "up",
            trendValue: "+5% improvement",
            icon: Target,
            gradient: "bg-gradient-to-br from-green-500 to-green-600"
        },
        {
            label: "Response Rate",
            value: "92%",
            trend: "up",
            trendValue: "Excellent",
            icon: Zap,
            gradient: "bg-gradient-to-br from-amber-500 to-amber-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <RecruiterStatsCard key={index} {...metric} />
            ))}
        </div>
    );
};

const PerformanceChart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LineChart className="h-5 w-5 text-purple-500" />
                Hiring Performance
            </h3>
        </motion.div>
    );
};

const Profile = () => {
    useGetAppliedJobs();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const joinDate = format(new Date(user?.createdAt || new Date()), 'MMM yyyy');
    const isRecruiter = user?.role === 'recruiter';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    {isRecruiter && (
                        <div className="absolute -top-4 left-0 right-0">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-4 rounded-xl flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Crown className="h-6 w-6 text-yellow-300" />
                                    <div>
                                        <h3 className="font-semibold">Premium Recruiter Account</h3>
                                        <p className="text-sm text-white/80">Unlimited access to all premium features</p>
                                    </div>
                                </div>
                                <Badge 
                                    variant="outline" 
                                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                                >
                                    <Star className="h-3 w-3 mr-1 text-yellow-300" />
                                    Elite Status
                                </Badge>
                            </motion.div>
                        </div>
                    )}
                    <div className="mt-16">
                        {isRecruiter ? (
                            <>
                                <RecruiterMetrics />
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <PerformanceChart />
                                    <RecentActivity />
                                </div>
                                <div className="mt-8">
                                    <JobPostings />
                                </div>
                            </>
                        ) : (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden"
                                >
                                    <div className="h-64 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10"></div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="absolute top-4 right-4 space-x-2"
                                        >
                                            <Button 
                                                onClick={() => setOpen(true)}
                                                variant="ghost" 
                                                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white gap-2"
                                            >
                                                <Pen className="h-4 w-4" />
                                                Edit Profile
                                            </Button>
                                            <ShareButton />
                                        </motion.div>
                                    </div>
                                    <div className="px-8 pb-8">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-16 relative">
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }}
                                                className="ring-4 ring-white dark:ring-gray-800 rounded-full shadow-xl"
                                            >
                                                <Avatar className="h-32 w-32">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                    <AvatarFallback className="bg-gradient-to-r from-violet-600 to-indigo-600 text-2xl text-white">
                                                        {user?.fullname?.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </motion.div>
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                            {user?.fullname}
                                                        </h1>
                                                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                        {user?.profile?.bio || 'No bio added yet'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                                    <Badge variant="secondary" className="px-3 py-1 gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        Joined {joinDate}
                                                    </Badge>
                                                    <Badge variant="secondary" className="px-3 py-1 gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {user?.profile?.location || 'Location not added'}
                                                    </Badge>
                                                    <Badge variant="secondary" className="px-3 py-1 gap-1">
                                                        <MessageCircle className="h-4 w-4" />
                                                        Open to opportunities
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                            <StatsCard
                                                icon={Briefcase}
                                                label="Applications"
                                                value={user?.applications?.length || "0"}
                                                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                                            />
                                            <StatsCard
                                                icon={Star}
                                                label="Shortlisted"
                                                value={user?.shortlisted || "0"}
                                                gradient="bg-gradient-to-br from-amber-500 to-amber-600"
                                            />
                                            <StatsCard
                                                icon={Bookmark}
                                                label="Saved Jobs"
                                                value={user?.savedJobs?.length || "0"}
                                                gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                                            />
                                            <StatsCard
                                                icon={Activity}
                                                label="Profile Views"
                                                value={user?.profileViews || "0"}
                                                gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
                                            />
                                        </motion.div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                            <ContactSection user={user} />
                                            <ProfessionalLinks user={user} />
                                        </div>
                                        <SkillsSection skills={user?.profile?.skills} />
                                        <ResumeSection resume={user?.profile?.resume} />
                                        <PremiumStatus />
                                        <SavedJobsSection />
                                    </div>
                                </motion.div>
                                <ActivitySection />
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

const StatsCard = ({ icon: Icon, label, value, gradient }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${gradient}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{value}</p>
            </div>
        </div>
    </motion.div>
);

const ContactSection = ({ user }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
    >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User2 className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            Contact Information
        </h2>
        <div className="space-y-3">
            <ContactItem icon={Mail} value={user?.email} color="text-blue-500 dark:text-blue-400" />
            <ContactItem icon={Phone} value={user?.phoneNumber} color="text-green-500 dark:text-green-400" />
            <ContactItem icon={Globe} value={user?.profile?.website || 'Website not added'} color="text-purple-500 dark:text-purple-400" />
        </div>
    </motion.div>
);

const ProfessionalLinks = ({ user }) => (
    <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
    >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            Professional Links
        </h2>
        <div className="space-y-3">
            <SocialLink 
                icon={Github} 
                platform="GitHub"
                href={user?.profile?.github} 
                color="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            />
            <SocialLink 
                icon={Linkedin} 
                platform="LinkedIn"
                href={user?.profile?.linkedin} 
                color="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            />
        </div>
    </motion.div>
);

const ContactItem = ({ icon: Icon, value, color }) => (
    <motion.div 
        whileHover={{ x: 5 }}
        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
    >
        <Icon className={`h-5 w-5 ${color}`} />
        <span>{value}</span>
    </motion.div>
);

const SocialLink = ({ icon: Icon, platform, href, color }) => (
    <motion.a 
        whileHover={{ x: 5 }}
        href={href || '#'} 
        target="_blank"
        className={`flex items-center gap-3 text-gray-600 dark:text-gray-400 ${color} transition-colors`}
    >
        <Icon className="h-5 w-5" />
        <span>{platform} Profile</span>
    </motion.a>
);

const SkillsSection = ({ skills }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
    >
        <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills & Expertise</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
            {skills?.length > 0 ? (
                skills.map((skill, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Badge className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                            {skill}
                        </Badge>
                    </motion.div>
                ))
            ) : (
                <span className="text-gray-500 dark:text-gray-400">No skills added yet</span>
            )}
        </div>
    </motion.div>
);

const ResumeSection = ({ resume }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(resume);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Resume download started!");
        } catch (error) {
            toast.error("Error downloading resume");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resume</h2>
                </div>
                {resume && (
                    <Button 
                        onClick={handleDownload}
                        variant="outline" 
                        className="gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                        <Download className="h-4 w-4 text-purple-500" />
                        <span className="text-purple-600 dark:text-purple-400">Download CV</span>
                    </Button>
                )}
            </div>
            <div className="mt-4">
                {resume ? (
                    <motion.a 
                        whileHover={{ scale: 1.01 }}
                        href={resume}
                        target="_blank"
                        className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                    Professional Resume
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Click to view your full resume
                                </p>
                            </div>
                        </div>
                    </motion.a>
                ) : (
                    <div className="text-center p-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">
                            No resume uploaded yet. Add your resume to increase your chances of getting hired.
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const PremiumUpgradeModal = ({ isOpen, setIsOpen }) => {
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const [loading, setLoading] = useState(false);

    const plans = {
        monthly: {
            price: '$9.99',
            period: 'month',
            features: [
                'Priority Application Review',
                'Featured Profile Listing',
                'Advanced Analytics',
                'Direct Recruiter Messages',
                'Custom Resume Templates',
                'AI-Powered Job Matches'
            ]
        },
        yearly: {
            price: '$99.99',
            period: 'year',
            features: [
                'All Monthly Features',
                'Career Development Sessions',
                'Priority Customer Support',
                'Personal Career Coach',
                'Interview Preparation Tools',
                'Skills Assessment Tests'
            ]
        }
    };

    const handleUpgrade = async (plan) => {
        setLoading(true);
        try {
            toast.success(`Upgrading to ${plan} plan...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success('Successfully upgraded to Premium!');
            setIsOpen(false);
        } catch (error) {
            toast.error('Upgrade failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Crown className="h-6 w-6 text-purple-500" />
                        Upgrade to Premium
                    </DialogTitle>
                    <DialogDescription>
                        Choose a plan that works best for your career goals
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {Object.entries(plans).map(([key, plan]) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                selectedPlan === key 
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                    : 'border-gray-200 dark:border-gray-700'
                            }`}
                            onClick={() => setSelectedPlan(key)}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold capitalize">{key}</h3>
                                <div className="text-2xl font-bold text-purple-600">{plan.price}</div>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">per {plan.period}</p>
                            <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <DialogFooter className="mt-6">
                    <Button
                        onClick={() => handleUpgrade(selectedPlan)}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Gem className="mr-2 h-4 w-4" />
                                Upgrade Now
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const PremiumStatus = () => {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
                            <Crown className="h-6 w-6 text-white animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                                Premium Profile
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Unlock exclusive features and boost your visibility
                            </p>
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                            onClick={() => setIsUpgradeModalOpen(true)}
                            className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Gem className="h-4 w-4 mr-2 animate-pulse" />
                            Upgrade Now
                        </Button>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-purple-200/50 dark:border-purple-800/50"
                    >
                        <ShieldCheck className="h-6 w-6 text-purple-500 mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Priority Support</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">24/7 dedicated assistance</p>
                    </motion.div>
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-purple-200/50 dark:border-purple-800/50"
                    >
                        <Zap className="h-6 w-6 text-amber-500 mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Featured Profile</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Stand out to recruiters</p>
                    </motion.div>
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-purple-200/50 dark:border-purple-800/50"
                    >
                        <Presentation className="h-6 w-6 text-emerald-500 mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Analytics</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Deep profile insights</p>
                    </motion.div>
                </div>
            </motion.div>
            <PremiumUpgradeModal 
                isOpen={isUpgradeModalOpen} 
                setIsOpen={setIsUpgradeModalOpen} 
            />
        </>
    );
};

const SavedJobsSection = () => {
    const navigate = useNavigate();
    const { savedJobs } = useSelector(state => state.auth.user);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-purple-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Saved Jobs</h2>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate('/saved-jobs')}
                    className="gap-2"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs?.slice(0, 4).map(job => (
                    <JobCard key={job._id} job={job} minimal />
                ))}
            </div>
        </motion.div>
    );
};

const ActivitySection = () => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
        <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <AppliedJobTable />
    </motion.div>
);

const ShareButton = () => {
    const navigate = useNavigate();
    
    const handleShare = async (platform) => {
        const url = window.location.href;
        const text = "Check out my professional profile!";

        const platforms = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            email: `mailto:?subject=${text}&body=${url}`,
            copy: async () => {
                await navigator.clipboard.writeText(url);
                toast.success("Profile link copied to clipboard!");
            }
        };

        if (platform === 'copy') {
            platforms.copy();
        } else {
            window.open(platforms[platform], '_blank');
        }
    };
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                >
                    <Share2 className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
                <div className="space-y-2">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2"
                        onClick={() => handleShare('twitter')}
                    >
                        <Twitter className="h-4 w-4" />
                        Twitter
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2"
                        onClick={() => handleShare('linkedin')}
                    >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2"
                        onClick={() => handleShare('email')}
                    >
                        <Mail className="h-4 w-4" />
                        Email
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2"
                        onClick={() => handleShare('copy')}
                    >
                        <Copy className="h-4 w-4" />
                        Copy Link
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

const RecentActivity = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Recent Activity
            </h3>
            <div className="space-y-4">
                {/* Add activity items here */}
            </div>
        </motion.div>
    );
};

const JobPostings = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                        <BriefcaseIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Active Job Postings
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage your current job listings
                        </p>
                    </div>
                </div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        onClick={() => navigate('/admin/jobs/create')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                <span>Post New Job</span>
                            </>
                        )}
                    </Button>
                </motion.div>
            </div>

            {/* Job Listings Table */}
            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Position
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Applications
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Sample row - Replace with your actual data mapping */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <BriefcaseIcon className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Senior Developer
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Full-time • Remote
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                    24 Applications
                                </Badge>
                            </td>
                            <td className="px-4 py-3">
                                <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    Active
                                </Badge>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate('/admin/jobs/edit/1')}
                                        className="hover:text-purple-600"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:text-blue-600"
                                    >
                                        View
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Profile;