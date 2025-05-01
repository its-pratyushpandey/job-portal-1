import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Linkedin, 
    Instagram, 
    Github, 
    Mail, 
    PhoneCall, 
    MapPin, 
    Globe2,
    Briefcase,
    GraduationCap,
    Users,
    HeartHandshake,
    Sparkles,
    ArrowUpRight,
    Building2,
    Target,
    Rocket,
    Shield,
    MessagesSquare
} from 'lucide-react';
import { Button } from '../ui/button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Explore",
            links: [
                { label: "Browse Jobs", href: "/jobs", icon: <Briefcase className="h-4 w-4 text-blue-500" /> },
                { label: "Companies", href: "/companies", icon: <Building2 className="h-4 w-4 text-purple-500" /> },
                
            ]
        },
        {
            title: "For Job Seekers",
            links: [
                { label: "Saved Jobs", href: "/saved-jobs", icon: <HeartHandshake className="h-4 w-4 text-pink-500" /> },
               
                { label: "Profile", href: "/profile", icon: <Users className="h-4 w-4 text-cyan-500" /> },
                
            ]
        },
        {
            title: "Quick Links",
            links: [
                { label: "About Us", href: "/about", icon: <Globe2 className="h-4 w-4 text-violet-500" /> },
                { label: "Contact Support", href: "/contact", icon: <MessagesSquare className="h-4 w-4 text-amber-500" /> },
              
            ]
        }
    ];

    const socialLinks = [
        { 
            icon: <Linkedin className="h-5 w-5" />, 
            href: "https://linkedin.com", 
            color: "hover:text-blue-500",
            label: "LinkedIn"
        },
        { 
            icon: <Github className="h-5 w-5" />, 
            href: "https://github.com", 
            color: "hover:text-gray-900 dark:hover:text-white",
            label: "GitHub"
        },
        { 
            icon: <Instagram className="h-5 w-5" />, 
            href: "https://instagram.com", 
            color: "hover:text-pink-500",
            label: "Instagram"
        }
    ];

    return (
        <footer className="relative bg-white dark:bg-gray-900 pt-20 pb-10 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Link to="/" className="inline-block group">
                            <motion.h2 
                                className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.02 }}
                            >
                                Next<span className="text-[#F83002]">Hire</span>
                            </motion.h2>
                        </Link>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            Your premier destination for career growth and professional opportunities. 
                            Connect with leading companies and take the next step in your career journey.
                        </p>
                        <div className="flex items-center gap-6 mt-8">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative ${social.color}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {social.label}
                                    </span>
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Sections */}
                    {footerSections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="lg:col-span-1"
                        >
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-6">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link 
                                            to={link.href}
                                            className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                                        >
                                            <span className="transform group-hover:scale-110 transition-transform">
                                                {link.icon}
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                {link.label}
                                            </span>
                                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            © {currentYear} NextHire. Building careers, connecting futures.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <Link 
                                to="/privacy" 
                                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                to="/terms" 
                                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link 
                                to="/contact" 
                                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
