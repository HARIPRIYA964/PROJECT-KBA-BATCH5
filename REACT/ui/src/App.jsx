import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Protected from "./routes/Protected";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/About";
import User from "./pages/User";
import AddTrip from "./pages/AddTrip";
import ViewTrip from "./pages/ViewTrip";
import UpdateTrip from "./pages/UpdateTrip";
import BookOnline from "./pages/BookOnline";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/BookingDetails";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  // Auth routes (login, signup)
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <Profile /> }
    ],
  },

  // User routes
  {
    element: <Protected role="user" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/about", element: <About /> },
          { path: "/bookonline", element: <BookOnline /> },
          { path: "/booking", element: <Booking /> },
         ,

        ],
      },
    ],
  },

  // Admin routes
  {
    element: <Protected role="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/user", element: <User /> },
          { path: "/addtrip", element: <AddTrip /> },
          { path: "/viewtrip", element: <ViewTrip /> },
          { path: "/updatetrip", element: <UpdateTrip /> },
          { path: "/bookingdetails", element: <BookingDetails /> },
        ],

      },
    ],
  },
]);
