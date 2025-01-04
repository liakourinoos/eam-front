import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./customHooks.jsx"; // Import your context provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './index.css'
// components 
import App from './App.jsx'
import Search from './Search.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import About from './About.jsx'
import ParentSettings from './ParentComponents/ParentSettings.jsx'
import ParentProfile from './ParentComponents/ParentProfile.jsx'
import NannyProfile from './NannyComponents/NannyProfile.jsx'
import Contact from './ParentComponents/Contact.jsx'
import ParentPayment from './ParentComponents/ParentPayment.jsx'
import ParentApplications from './ParentComponents/ParentApplications.jsx'
import ApplicationForm from '../src/views/Parent/ApplicationForm.jsx'
import NannySettings from './NannyComponents/NannySetting.jsx';
import NannyOffers from './NannyComponents/NannyOffers.jsx';
import OfferForm from './views/Nanny/OfferForm.jsx';
import Notifications from './generic components/Notifications.jsx';
import ParentOrNannySignUp from './NannyOrParentSignUp.jsx';
import Reviews from './generic components/Reviews.jsx';
import ParentHistory from './ParentComponents/ParentHistory.jsx';
import NannyHistory  from './NannyComponents/NannyHistory.jsx';
// import ParentApplicationsHistory from '../src/views/Parent/ParentApplicationsHistory.jsx';

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/search', element: <Search/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <ParentOrNannySignUp/>},
  {path: '/about', element: <About/>},
  {path: '/parentsettings',element:<ParentSettings/>},
  {path: '/nannysettings', element:<NannySettings/>},
  {path: '/parentpayments', element: <ParentPayment/>},
  {path: '/parentapplications', element: <ParentApplications/>},
  {path: '/nannyoffers', element: <NannyOffers/>},
  {path: '/notifications', element: <Notifications/>},
  {path: '/signupparent', element: <SignUp role={true} />},
  {path: '/signupnanny', element: <SignUp role={false} />},
  {path: '/reviews', element: <Reviews/>},
  {path: '/parenthistory', element: <ParentHistory/>},
  {path: '/nannyhistory', element: <NannyHistory/>},

  // Dynamic routes 
  {path:'/contact/:id' , element:<Contact/>},


  //profiles
  { path: '/parentprofile/:id', element: <ParentProfile /> },
  { path: '/nannyprofile/:id', element:<NannyProfile/>},

  //Parent Applications
  { path: '/applicationform', element: <ApplicationForm/>},
  { path: '/viewapplication/:id', element: <ApplicationForm action="Προβολή Αίτησης"/>},
  { path: '/editapplication/:id', element: <ApplicationForm action="Επεξεργασία Αίτησης"/>},

  //Parent History
  // { path:'/parentapplicationshistory' , element: <></>}

  //Nanny Offers
  { path: '/offerform', element: <OfferForm/>},
  { path: '/viewoffer/:id', element: <OfferForm action="Προβολή Αγγελίας"/>},
  { path: '/editoffer/:id', element: <OfferForm action="Επεξεργασία Αγγελίας"/>},

  
]);
export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)






