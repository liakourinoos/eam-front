import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from "./customHooks.jsx"; // Import your context provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './index.css'
// components 
import App from './App.jsx'
import Search from './Search.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import About from './About.jsx'
import ParentSettings from './ParentSettings.jsx'
import NannyProfile from './NannyProfile.jsx'
import Contact from './Contact.jsx'
import ParentPayment from './ParentPayment.jsx'
import ParentApplications from './ParentApplications.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/search', element: <Search/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/about', element: <About/>},
  {path: '/parentSettings',element:<ParentSettings/>},
  {path: '/nannyProfile', element:<NannyProfile/>},
  {path:'/contact' , element:<Contact/>},
  {path: '/parentpayments', element: <ParentPayment/>},
  {path: '/parentapplications', element: <ParentApplications/>},
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)






