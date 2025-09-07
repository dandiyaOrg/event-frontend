import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import Form from './Components/Input'
// import {Clients, Logo, Products, ClientCategory, Popup} from './Pages'
// import Form from './components/Form.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<Sidebar />}>
          <Route path='/' element={<Form />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)