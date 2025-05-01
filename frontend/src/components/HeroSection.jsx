import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, TrendingUp, Globe, Award } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    const features = [
        { icon: <Briefcase className="h-6 w-6" />, text: "10K+ Jobs Posted" },
        { icon: <TrendingUp className="h-6 w-6" />, text: "Leading Companies" },
        { icon: <Globe className="h-6 w-6" />, text: "Global Opportunities" },
        { icon: <Award className="h-6 w-6" />, text: "Trusted Platform" },
    ]

    return (
        <div className='min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-4 text-center'>
                <motion.div 
                    className='flex flex-col gap-8 items-center'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Badge */}
                    <motion.span 
                        className='px-6 py-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold shadow-md hover:shadow-lg transition-all duration-300'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Your Career Journey Starts Here
                    </motion.span>

                    {/* Main Heading */}
                    <motion.h1 
                        className='text-5xl md:text-6xl font-bold leading-tight'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Discover Your 
                        <span className='text-purple-600 dark:text-purple-400'> Perfect Role </span> 
                        <br className='hidden md:block' /> 
                        Build Your Future
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Connect with top employers and find opportunities that match your expertise and aspirations
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div 
                        className='w-full max-w-2xl mx-auto mt-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className='flex items-center gap-2 p-2 rounded-full shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:ring-2 ring-purple-500 transition-all duration-300'>
                            <Search className='h-6 w-6 text-gray-400 dark:text-gray-500 ml-4' />
                            <input
                                type="text"
                                placeholder='Search for your dream job...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                className='flex-1 px-4 py-3 text-lg bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="mr-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-8 py-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                            >
                                Search Jobs
                            </Button>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div 
                        className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className='flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300'
                                whileHover={{ y: -5 }}
                            >
                                <div className='p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
                                    {feature.icon}
                                </div>
                                <span className='font-medium text-gray-900 dark:text-white'>
                                    {feature.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection