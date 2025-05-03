import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageCircle, 
    Send, 
    Bot, 
    User2, 
    Loader2,
    MinimizeIcon,
    MaximizeIcon,
    X,
    Smile,
    ThumbsUp,
    AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const LiveChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const { user } = useSelector(state => state.auth);

    // Enhanced chatbot responses
    const chatbotResponses = {
        greetings: {
            keywords: ['hi', 'hello', 'hey', 'greetings'],
            responses: [
                "Hello! Welcome to NextHire. How can I assist you today?",
                "Hi there! I'm your NextHire assistant. What can I help you with?",
                "Welcome! How may I help you with your job search today?"
            ]
        },
        jobSearch: {
            keywords: ['find job', 'search job', 'looking for job', 'job opportunities'],
            responses: [
                "I can help you find the perfect job! Here's how to get started:\n1. Visit our Jobs page\n2. Use filters for location, role, and experience\n3. Click 'Apply Now' on positions you like",
                "To find relevant jobs:\n• Update your profile with latest skills\n• Use the search bar with specific keywords\n• Set up job alerts for instant notifications"
            ]
        },
        application: {
            keywords: ['how to apply', 'application process', 'submit application'],
            responses: [
                "The application process is simple:\n1. Create/Update your profile\n2. Upload your resume (PDF format)\n3. Write a brief cover letter\n4. Click 'Apply Now'\n\nNeed help with any of these steps?",
                "To apply for jobs:\n• Ensure your profile is complete\n• Customize your resume for each role\n• Follow application instructions carefully"
            ]
        },
        resume: {
            keywords: ['resume', 'cv', 'portfolio'],
            responses: [
                "For resume help:\n• Upload in PDF format (max 5MB)\n• Include relevant skills and experience\n• Update through your Profile settings\n\nWould you like resume writing tips?",
                "Resume tips:\n1. Keep it concise and professional\n2. Highlight relevant achievements\n3. Update regularly with new skills"
            ]
        },
        profile: {
            keywords: ['profile', 'account', 'settings'],
            responses: [
                "To manage your profile:\n1. Click on your avatar\n2. Select 'Profile Settings'\n3. Update your information\n4. Save changes",
                "Profile optimization tips:\n• Add a professional photo\n• List your key skills\n• Include work experience\n• Add portfolio links"
            ]
        },
        technical: {
            keywords: ['error', 'problem', 'issue', 'bug'],
            responses: [
                "I'm sorry you're experiencing issues. Let's help fix that:\n1. Clear your browser cache\n2. Try refreshing the page\n3. Contact support if issue persists",
                "For technical support:\n• Email: support@nexthire.com\n• Live Chat: Available 24/7\n• Help Center: Detailed guides"
            ]
        }
    };

    // Get random response from category
    const getRandomResponse = (responses) => {
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Enhanced response generation
    const generateResponse = (userMessage) => {
        const message = userMessage.toLowerCase();
        let response = '';

        // Check each category
        for (const category of Object.values(chatbotResponses)) {
            if (category.keywords.some(keyword => message.includes(keyword))) {
                response = getRandomResponse(category.responses);
                break;
            }
        }

        // Default response if no category matches
        if (!response) {
            response = "I understand you're asking about " + message + ". Could you please provide more details or rephrase your question? I'm here to help!";
        }

        return response;
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: message,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
            avatar: user?.profile?.profilePhoto
        };

        setMessages(prev => [...prev, userMessage]);
        setMessage('');
        setIsTyping(true);

        // Simulate AI thinking with dynamic timing
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

        // Generate AI response
        const aiResponse = generateResponse(message);

        // Add AI response
        const botMessage = {
            id: Date.now() + 1,
            text: aiResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
            avatar: '/bot-avatar.png'
        };

        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
    };

    // Welcome message on chat open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage = {
                id: Date.now(),
                text: "👋 Welcome to NextHire Support! I'm your AI assistant, ready to help with:\n• Job Search\n• Applications\n• Profile Setup\n• Technical Support\n\nHow can I assist you today?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
                avatar: '/bot-avatar.png'
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

    // Auto-scroll to latest message
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const chatVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
    };

    return (
        <>
            {/* Chat Trigger Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={chatVariants}
                        className={`fixed ${isMinimized ? 'h-[60px]' : 'h-[600px]'} w-[380px] bottom-24 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden`}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-blue-600">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 border-2 border-white">
                                    <AvatarImage src="/bot-avatar.png" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="text-white">
                                    <h3 className="font-semibold">NextHire Support</h3>
                                    <p className="text-xs opacity-90">Always here to help</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/20"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                >
                                    {isMinimized ? <MaximizeIcon className="h-4 w-4" /> : <MinimizeIcon className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Chat Messages */}
                                <div className="h-[450px] overflow-y-auto p-4 space-y-4">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex items-start gap-3 ${
                                                msg.sender === 'user' ? 'flex-row-reverse' : ''
                                            }`}
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={msg.avatar} />
                                                <AvatarFallback>
                                                    {msg.sender === 'user' ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={`max-w-[70%] ${
                                                msg.sender === 'user' 
                                                    ? 'bg-purple-600 text-white' 
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            } p-3 rounded-xl`}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/bot-avatar.png" />
                                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                            </Avatar>
                                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Chat Input */}
                                <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1"
                                        />
                                        <Button 
                                            type="submit"
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                            disabled={!message.trim()}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LiveChatBox;