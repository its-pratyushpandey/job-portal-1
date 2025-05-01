import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { 
  LogOut, 
  User2, 
  Search, 
  Building2, 
  BriefcaseIcon, 
  BookmarkIcon,
  HomeIcon,
  GlobeIcon,
  MenuIcon,
  X
} from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { ThemeToggle } from "../ThemeToggle"
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children, icon: Icon }) => (
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
          isActive(to) 
            ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold" 
            : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </Link>
    );

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled 
                  ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800" 
                  : "bg-white dark:bg-gray-900"
            )}
        >
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Next<span className="text-[#F83002]">Hire</span>
                        </h1>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex items-center gap-2">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><NavLink to="/admin/companies" icon={Building2}>Companies</NavLink></li>
                                <li><NavLink to="/admin/jobs" icon={BriefcaseIcon}>Jobs</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/" icon={HomeIcon}>Home</NavLink></li>
                                <li><NavLink to="/jobs" icon={BriefcaseIcon}>Jobs</NavLink></li>
                                <li><NavLink to="/browse" icon={GlobeIcon}>Browse</NavLink></li>
                                <li><NavLink to="/saved-jobs" icon={BookmarkIcon}>Saved Jobs</NavLink></li>
                            </>
                        )}
                    </ul>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:ring-2 ring-purple-500 transition-all duration-300">
                            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="bg-transparent outline-none text-sm w-40 transition-all duration-300 focus:w-60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ThemeToggle />

                    {/* User Menu */}
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="rounded-full">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Avatar className="cursor-pointer ring-2 ring-purple-500 dark:ring-purple-400">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                            {user?.fullname?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="p-2">
                                    <div className="flex items-start gap-4 p-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl">
                                                {user?.fullname?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {user?.fullname}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {user?.profile?.bio || 'No bio added'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                                        {user?.role === 'student' && (
                                            <Button 
                                                variant="ghost" 
                                                className="w-full justify-start gap-2 mb-2"
                                                onClick={() => navigate('/profile')}
                                            >
                                                <User2 className="h-4 w-4" />
                                                View Profile
                                            </Button>
                                        )}
                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start gap-2 text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            onClick={logoutHandler}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                    >
                        <div className="p-4 space-y-4">
                            {/* Mobile Navigation Links */}
                            <div className="space-y-2">
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <NavLink to="/admin/companies" icon={Building2}>Companies</NavLink>
                                        <NavLink to="/admin/jobs" icon={BriefcaseIcon}>Jobs</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/" icon={HomeIcon}>Home</NavLink>
                                        <NavLink to="/jobs" icon={BriefcaseIcon}>Jobs</NavLink>
                                        <NavLink to="/browse" icon={GlobeIcon}>Browse</NavLink>
                                        <NavLink to="/saved-jobs" icon={BookmarkIcon}>Saved Jobs</NavLink>
                                    </>
                                )}
                            </div>

                            {/* Mobile Search */}
                            <div className="relative">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <Search className="h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs..."
                                        className="bg-transparent outline-none w-full text-sm"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Mobile Auth Buttons */}
                            {!user && (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login">
                                        <Button variant="outline" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;