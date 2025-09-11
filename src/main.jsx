import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider ,useSelector} from 'react-redux';
import { store } from './features/Store';
import Login from "./Pages/LogIn"; // your login component
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Events from "./Pages/Events";
import Employees from "./Pages/Employees";
import Transactions from "./Pages/Transactions";
import Profile from "./Pages/Profile";
import EventDetails from "./Pages/EventDetails";
import SignUp from "./Pages/SignUp";
import BillingUser from "./Pages/BillingUser";
import Attendee from "./Pages/Attendee";
import Orders from "./Pages/Orders";
import EventDetailForm from "./Pages/EventDetailForm";



function ProtectedRoute({ children }) {
  const isLogin = useSelector(state => state.auth.isLogin);
  if (!isLogin) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
    
  }
  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public login path */}
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />

      {/* Protected area */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="events/new" element={<EventDetailForm />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="employees" element={<Employees />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="billingUsers" element={<BillingUser />} />
        <Route path="attendee" element={<Attendee />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
