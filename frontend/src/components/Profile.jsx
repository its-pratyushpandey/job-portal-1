import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-6'>
                            <Avatar className="h-24 w-24 ring-2 ring-purple-500 dark:ring-purple-400">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-2xl text-gray-900 dark:text-white'>
                                    {user?.fullname}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    {user?.profile?.bio || 'No bio added yet'}
                                </p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline" 
                            className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Pen className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className='mt-8 space-y-4'>
                        <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
                            <Mail className="h-5 w-5" />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
                            <Contact className="h-5 w-5" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h2 className="font-medium text-lg text-gray-900 dark:text-white mb-3">
                            Skills
                        </h2>
                        <div className='flex flex-wrap items-center gap-2'>
                            {user?.profile?.skills.length > 0 ? (
                                user.profile.skills.map((skill, index) => (
                                    <Badge 
                                        key={index}
                                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800"
                                    >
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">
                                    No skills added yet
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='mt-8'>
                        <Label className="text-lg font-medium text-gray-900 dark:text-white">
                            Resume
                        </Label>
                        <div className="mt-2">
                            {user?.profile?.resume ? (
                                <a 
                                    href={user.profile.resume} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline"
                                >
                                    {user.profile.resumeOriginalName || 'View Resume'}
                                </a>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">
                                    No resume uploaded yet
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6'>
                    <h2 className='font-medium text-xl text-gray-900 dark:text-white mb-6'>
                        Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile