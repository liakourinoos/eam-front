import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from "./customHooks.jsx"; // Import your context provider
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

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/search', element: <Search/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/about', element: <About/>},
  {path: '/parentSettings',element:<ParentSettings/>},
  {path: '/nannyProfile', element:<NannyProfile/>},
  {path:'/contact' , element:<Contact/>},
]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
  </StrictMode>,
)
