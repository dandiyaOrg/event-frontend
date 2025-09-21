import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store.js";
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
import EventDetails from "./Pages/EventDetails";
import EventDetailForm from "./Pages/EventDetailForm";
import SubEvent from "./Components/SubEvent.jsx";
import SubEventForm from "./Pages/SubEventForm";
import SubEventDetails from "./Pages/SubEventDetail";
import SubEventEditFrom from "./Pages/SubEventEditFrom.jsx";
import PassTable from "./Components/PassTable.jsx";
import PassCreateForm from "./Pages/PassCreateForm.jsx";
import Employees from "./Pages/Employees";
import EmployeeDetail from "./Pages/EmployeeDetail.jsx";
import EmployeeDetailForm from "./Pages/EmployeeDetailForm";
import EmployeeEditForm from "./Pages/EmployeeEditForm.jsx";
import Transactions from "./Pages/Transactions";
import TransactionDetail from "./Pages/TransactionDetail.jsx";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import BillingUser from "./Pages/BillingUser";
import BillingUserPage from "./Pages/BillingUserData";
import Attendee from "./Pages/Attendee";
import Orders from "./Pages/Orders";
import OrderDetailsPage from "./Pages/OrderDetail";
import OtpPage from "./Pages/OtpPage.jsx";
import AttendeeDetailsPage from "./Pages/AttendeeDetailPage";

function ProtectedRoute({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  if (!accessToken) {
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
      <Route path="/otp" element={<OtpPage />} />

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
        {/* Main Events (parent list & detail) */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />

        {/* Sub-event Management (nested under eventId) */}
        <Route path="/events/:eventId/subevents" element={<SubEvent />} />
        <Route
          path="/events/:eventId/subevents/new"
          element={<SubEventForm />}
        />
        <Route
          path="/events/:eventId/subevents/:subEventId"
          element={<SubEventDetails />}
        />
        <Route
          path="/events/:eventId/subevents/:subEventId/edit"
          element={<SubEventEditFrom />}
        />

        {/* Pass Management (nested under subEventId) */}
        <Route
          path="/events/:eventId/subevents/:subEventId/passes"
          element={<PassTable />}
        />
        <Route
          path="/events/:eventId/subevents/:subEventId/passes/create"
          element={<PassCreateForm />}
        />

        {/* Employee Routes */}
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/new" element={<EmployeeDetailForm />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
        <Route
          path="/employees/:employeeId/edit"
          element={<EmployeeEditForm />}
        />

        {/* Transaction Routes  */}
        <Route path="/transactions" element={<Transactions />} />
        <Route
          path="/transactions/:transactionId"
          element={<TransactionDetail />}
        />

        {/* Billing Users Routes */}
        <Route path="billingUsers" element={<BillingUser />} />
        <Route path="billingUsers/:userId" element={<BillingUserPage />} />

        {/* Attendee Routes  */}
        <Route path="attendee" element={<Attendee />} />
        <Route path="attendee/:attendeeId" element={<AttendeeDetailsPage />} />

        {/* Orders Routes  */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetailsPage />} />

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
