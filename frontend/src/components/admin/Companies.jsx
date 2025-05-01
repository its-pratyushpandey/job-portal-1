import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Building2, Search, MapPin, Users, Globe, Briefcase,
    ArrowUpDown, Filter, Award, Star, TrendingUp, 
    Clock, CheckCircle2, Share2, ExternalLink, Sparkles, 
    Target, Heart, Network, Plus, BarChart3, Settings,
    Zap, Trophy, Coffee, Rocket
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../shared/Navbar'
import useGetCompanies from '@/hooks/useGetCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { format } from 'date-fns'

// Stats component for overview section
const StatsOverview = () => {
    const stats = [
        { icon: Building2, label: "Total Companies", value: "150+", color: "text-blue-500" },
        { icon: Briefcase, label: "Active Jobs", value: "1.2k+", color: "text-green-500" },
        { icon: Users, label: "Total Employees", value: "50k+", color: "text-purple-500" },
        { icon: Award, label: "Top Rated", value: "90%", color: "text-yellow-500" }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-900 ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

const Companies = () => {
    useGetCompanies()
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('relevance')
    const [viewMode, setViewMode] = useState('grid')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { companies } = useSelector(store => store.company)

    // Filter and sort companies
    const getFilteredCompanies = () => {
        let filtered = [...companies]

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(company => 
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Apply status filter
        if (filter !== 'all') {
            filtered = filtered.filter(company => company.status.toLowerCase() === filter)
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'jobs':
                filtered.sort((a, b) => (b.jobCount || 0) - (a.jobCount || 0))
                break
            default:
                break
        }

        return filtered
    }

    const filteredCompanies = getFilteredCompanies()

    // Search handler with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchCompanyByText(searchQuery))
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery, dispatch])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 dark:to-gray-900 opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 py-16 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span>Manage Your Business Empire</span>
                        </motion.div>
                        
                        <div className="flex justify-between items-center">
                            <div>
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-5xl font-bold mb-4 text-left"
                                >
                                    Your Companies
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-gray-100 mb-8 text-left max-w-2xl"
                                >
                                    Create, manage and grow your business presence. Connect with talent and build your team.
                                </motion.p>
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button 
                                    onClick={() => navigate('/admin/companies/create')}
                                    className="bg-white text-purple-600 hover:bg-gray-100 gap-2 rounded-full px-6"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add New Company
                                </Button>
                            </motion.div>
                        </div>

                        {/* Search Bar */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="max-w-2xl mx-auto mt-8"
                        >
                            <div className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                <Search className="h-5 w-5 text-white ml-4" />
                                <Input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Overview */}
                <StatsOverview />

                {/* Filters Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="flex items-center gap-4 flex-wrap">
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Companies</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="hiring">Hiring</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px]">
                                    <ArrowUpDown className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="name">Company Name</SelectItem>
                                    <SelectItem value="jobs">Number of Jobs</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {['Tech', 'Startup', 'Enterprise', 'Remote'].map((tag) => (
                                <Badge 
                                    key={tag}
                                    variant="secondary" 
                                    className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 cursor-pointer transition-colors"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Companies Grid */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={viewMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <CompanyCard key={company._id} company={company} />
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-12"
                            >
                                <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No companies found
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    Get started by creating your first company
                                </p>
                                <Button 
                                    onClick={() => navigate('/admin/companies/create')}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                >
                                    Create Company
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

const CompanyCard = ({ company }) => {
    const navigate = useNavigate()

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden group"
        >
            {/* Company Header */}
            <div className="relative h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                <div className="absolute -bottom-10 left-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="h-20 w-20 rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                        {company.logo ? (
                            <img 
                                src={company.logo} 
                                alt={company.name} 
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <Building2 className="h-full w-full text-purple-600 dark:text-purple-400" />
                        )}
                    </motion.div>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                        Verified
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {company.rating || '4.8'}
                    </Badge>
                </div>
            </div>

            {/* Company Info */}
            <div className="p-6 pt-12">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {company.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="h-4 w-4" />
                            {company.location || 'Location not specified'}
                        </div>
                    </div>
                    <Badge className={`
                        ${company.status === 'hiring' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          company.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'}
                    `}>
                        <Briefcase className="h-3 w-3 mr-1" />
                        {company.status || 'Status'}
                    </Badge>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{company.size || '10-50 employees'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Globe className="h-4 w-4" />
                        <span>{company.industry || 'Technology'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <TrendingUp className="h-4 w-4" />
                        <span>{company.growth || 'Fast-growing'}</span>
                    </div>
                    {company.createdAt && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Created {format(new Date(company.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {(company.tags || ['AI/ML', 'Remote', 'Benefits']).map((tag) => (
                        <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <motion.div className="flex items-center gap-3">
                    <Button 
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 gap-2"
                    >
                        Manage
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Companies