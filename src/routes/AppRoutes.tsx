import { Routes, Route } from "react-router-dom";
import { useUserLocation } from "../hooks/useUserLocation";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";

// Public pages
import Home from "../pages/public/Home";
import Books from "../pages/public/Books";
import About from "../pages/public/About";

// Auth pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Dashboard pages
import DashboardHome from "../pages/dashboard/home/DashboardHome";
import BooksList from "../pages/dashboard/books/BooksList";
import BookCreate from "../pages/dashboard/books/BookCreate";
import BookEdit from "../pages/dashboard/books/BookEdit";
import StoreInfo from "../pages/dashboard/store/StoreInfo";
import StoreEdit from "../pages/dashboard/store/StoreEdit";
import EmployeesList from "../pages/dashboard/employees/EmployeesList";
import EmployeeEdit from "../pages/dashboard/employees/EmployeeEdit";
import UsersList from "../pages/dashboard/users/UsersList";
import UserEdit from "../pages/dashboard/users/UserEdit";

export default function AppRoutes() {

  const location = useUserLocation();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout pageTitle="Sebo" location={location}><Home /></Layout>} />
      <Route path="/books" element={<Layout pageTitle="Livros" location={location}><Books /></Layout>} />
      <Route path="/about" element={<><Header location={location}/><About /></>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />

      {/* Books Dashboard */}
      <Route path="/dashboard/books" element={<ProtectedRoute><BooksList /></ProtectedRoute>} />
      <Route path="/dashboard/books/create" element={<ProtectedRoute><BookCreate /></ProtectedRoute>} />
      <Route path="/dashboard/books/:id/edit" element={<ProtectedRoute><BookEdit /></ProtectedRoute>} />

      {/* Store Dashboard */}
      <Route path="/dashboard/store" element={<ProtectedRoute><StoreInfo /></ProtectedRoute>} />
      <Route path="/dashboard/store/edit" element={<ProtectedRoute><StoreEdit /></ProtectedRoute>} />

      {/* Employees Dashboard */}
      <Route path="/dashboard/employees" element={<ProtectedRoute><EmployeesList /></ProtectedRoute>} />
      <Route path="/dashboard/employees/:id/edit" element={<ProtectedRoute><EmployeeEdit /></ProtectedRoute>} />

      {/* Users Dashboard (Admin) */}
      <Route path="/dashboard/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/dashboard/users/:id/edit" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
    </Routes>
  );
}
