import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { 
    Shield, 
    Lock, 
    UserCheck, 
    Server, 
    Scale,
    Eye,
    Clock,
    Cookie,
    MessageCircle
} from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <Lock className="h-6 w-6 text-purple-500" />,
            title: "Data Collection",
            content: [
                "Personal Information (name, email, phone)",
                "Professional Details (resume, work history)",
                "Usage Information (interactions, preferences)",
                "Device Information (browser type, IP address)"
            ]
        },
        {
            icon: <Server className="h-6 w-6 text-blue-500" />,
            title: "Data Security",
            content: [
                "Industry-standard encryption protocols",
                "Regular security audits and updates",
                "Secure data storage and transmission",
                "Limited employee data access"
            ]
        },
        {
            icon: <Eye className="h-6 w-6 text-green-500" />,
            title: "Data Usage",
            content: [
                "Job matching and recommendations",
                "Profile enhancement and visibility",
                "Service improvement and analytics",
                "Communication with employers"
            ]
        },
        {
            icon: <UserCheck className="h-6 w-6 text-amber-500" />,
            title: "Your Rights",
            content: [
                "Access your personal data",
                "Request data correction or deletion",
                "Control privacy settings",
                "Opt-out of communications"
            ]
        },
        {
            icon: <Cookie className="h-6 w-6 text-indigo-500" />,
            title: "Cookies Policy",
            content: [
                "Essential functionality cookies",
                "Analytics and performance tracking",
                "Preference saving",
                "Third-party service cookies"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4"
                        >
                            <Shield className="h-8 w-8 text-purple-600" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <ul className="space-y-2 pl-11">
                                        {section.content.map((item, itemIndex) => (
                                            <motion.li
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                                className="text-gray-600 dark:text-gray-400 flex items-center gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <MessageCircle className="h-6 w-6 text-purple-500" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Contact Us
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                For any privacy-related questions or concerns, please contact us at{' '}
                                <a 
                                    href="mailto:privacy@nexthire.com" 
                                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                >
                                    pratyush21072005@gmail.com
                                </a>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;