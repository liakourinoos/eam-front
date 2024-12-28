import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./customHooks.jsx"; // Import your context provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './index.css'
// components 
import App from './App.jsx'
import Search from './ParentComponents/Search.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import About from './About.jsx'
import ParentSettings from './ParentComponents/ParentSettings.jsx'
import NannyProfile from './NannyComponents/NannyProfile.jsx'
import Contact from './ParentComponents/Contact.jsx'
import ParentPayment from './ParentComponents/ParentPayment.jsx'
import ParentApplications from './ParentComponents/ParentApplications.jsx'
import ApplicationForm from '../src/views/Parent/ApplicationForm.jsx'


const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/search', element: <Search/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/about', element: <About/>},
  {path: '/parentSettings',element:<ParentSettings/>},
  {path:'/contact' , element:<Contact/>},
  {path: '/parentpayments', element: <ParentPayment/>},
  {path: '/parentapplications', element: <ParentApplications/>},
  {path: '/applicationform', element: <ApplicationForm/>},


  // Dynamic routes 
  // { path: '/parentprofile/:id', element: <ParentProfile /> },
  { path: '/viewapplication/:id', element: <ApplicationForm action="Προβολή Αίτησης"/>},
  { path: '/editapplication/:id', element: <ApplicationForm action="Επεξεργασία Αίτησης"/>},
  { path: '/nannyprofile/:id', element:<NannyProfile/>}
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)






