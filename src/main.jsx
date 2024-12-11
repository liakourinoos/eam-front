import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// components 
import App from './App.jsx'
import Search from './Search.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import About from './About.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/search', element: <Search/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/about', element: <About/>},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
