import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard';
import Events from './Pages/Events';
import Employees from './Pages/Employees';
import Transactions from './Pages/Transactions';
import Profile from './Pages/Profile';
import EventDetails from './Pages/EventDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Sidebar />}>
      <Route index element={<Dashboard />} />
      <Route path='events' element={<Events />}/>
      <Route path='events/:eventId' element={<EventDetails />} />
        
      <Route path='employees' element={<Employees />} />
      <Route path='transactions' element={<Transactions />} />
      <Route path='profile' element={<Profile />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
