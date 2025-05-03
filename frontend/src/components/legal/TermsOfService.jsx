import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Scale, FileText, Users, AlertCircle, Shield, Check } from 'lucide-react';

const TermsOfService = () => {
    const sections = [
        {
            icon: <Scale className="h-6 w-6 text-purple-500" />,
            title: "Terms of Use",
            content: "By accessing and using NextHire, you agree to comply with these terms and all applicable laws. Our platform connects job seekers with employers in a professional and ethical manner."
        },
        {
            icon: <Users className="h-6 w-6 text-blue-500" />,
            title: "User Responsibilities",
            content: "Users must provide accurate information, maintain account security, and use the platform responsibly. Any misuse or fraudulent activity will result in account termination."
        },
        {
            icon: <FileText className="h-6 w-6 text-green-500" />,
            title: "Content Guidelines",
            content: "All content posted must be professional, accurate, and free from discriminatory or inappropriate material. We reserve the right to remove content that violates our guidelines."
        },
        {
            icon: <AlertCircle className="h-6 w-6 text-red-500" />,
            title: "Limitations of Liability",
            content: "While we strive to maintain platform quality, NextHire is provided 'as is' without warranties. We're not liable for any damages arising from platform use."
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
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4"
                        >
                            <Scale className="h-8 w-8 text-purple-600" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Effective date: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {section.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {section.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;