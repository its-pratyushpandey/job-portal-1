import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { ThemeProvider } from "./components/ThemeProvider"
import SavedJobs from './components/SavedJobs'
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import HelpCenter from './components/help/HelpCenter';
import Analytics from './components/admin/Analytics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/saved-jobs",
    element: <SavedJobs />
  },
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms",
    element: <TermsOfService />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  {
    path: "/admin/analytics",
    element: <ProtectedRoute><Analytics /></ProtectedRoute>
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="job-portal-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App