import React, { useState } from 'react'
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
    Share2
} from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const joinDate = format(new Date(user?.createdAt || new Date()), 'MMM yyyy');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Cover Image with Overlay */}
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
                            <Button
                                variant="ghost"
                                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Avatar Section */}
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

                        {/* Stats Grid */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                        >
                            <StatsCard
                                icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                                label="Applications"
                                value="0"
                            />
                            <StatsCard
                                icon={<Star className="h-5 w-5 text-yellow-500" />}
                                label="Shortlisted"
                                value="0"
                            />
                            <StatsCard
                                icon={<Trophy className="h-5 w-5 text-purple-500" />}
                                label="Interviews"
                                value="0"
                            />
                            <StatsCard
                                icon={<Heart className="h-5 w-5 text-red-500" />}
                                label="Saved Jobs"
                                value="0"
                            />
                        </motion.div>

                        {/* Contact & Professional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <ContactSection user={user} />
                            <ProfessionalLinks user={user} />
                        </div>

                        {/* Skills Section */}
                        <SkillsSection skills={user?.profile?.skills} />

                        {/* Resume Section */}
                        <ResumeSection resume={user?.profile?.resume} />
                    </div>
                </motion.div>

                {/* Activity Section */}
                <ActivitySection />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

// Component for stats cards
const StatsCard = ({ icon, label, value }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm"
    >
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </motion.div>
);

// Component for contact section
const ContactSection = ({ user }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
    >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Contact className="h-5 w-5 text-purple-500" />
            Contact Information
        </h2>
        <div className="space-y-3">
            <ContactItem icon={Mail} value={user?.email} color="text-blue-500" />
            <ContactItem icon={Phone} value={user?.phoneNumber} color="text-green-500" />
            <ContactItem icon={Globe} value={user?.profile?.website || 'Website not added'} color="text-purple-500" />
        </div>
    </motion.div>
);

// Component for professional links
const ProfessionalLinks = ({ user }) => (
    <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
    >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-purple-500" />
            Professional Links
        </h2>
        <div className="space-y-3">
            <SocialLink 
                icon={Github} 
                platform="GitHub"
                href={user?.profile?.github} 
                color="hover:text-gray-900 dark:hover:text-white"
            />
            <SocialLink 
                icon={Linkedin} 
                platform="LinkedIn"
                href={user?.profile?.linkedin} 
                color="hover:text-blue-600"
            />
        </div>
    </motion.div>
);

// Component for contact items
const ContactItem = ({ icon: Icon, value, color }) => (
    <motion.div 
        whileHover={{ x: 5 }}
        className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
    >
        <Icon className={`h-5 w-5 ${color}`} />
        <span>{value}</span>
    </motion.div>
);

// Component for social links
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

// Component for skills section
const SkillsSection = ({ skills }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
    >
        <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
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
                        <Badge className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800/50">
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

// Component for resume section
const ResumeSection = ({ resume }) => (
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
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download CV
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

// Component for activity section
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

export default Profile;