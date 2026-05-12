import { Routes, Route } from "react-router-dom";

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
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/books" element={<Layout><Books /></Layout>} />
      <Route path="/about" element={<><Header/><About /></>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardHome />} />

      {/* Books Dashboard */}
      <Route path="/dashboard/books" element={<BooksList />} />
      <Route path="/dashboard/books/create" element={<BookCreate />} />
      <Route path="/dashboard/books/:id/edit" element={<BookEdit />} />

      {/* Store Dashboard */}
      <Route path="/dashboard/store" element={<StoreInfo />} />
      <Route path="/dashboard/store/edit" element={<StoreEdit />} />

      {/* Employees Dashboard */}
      <Route path="/dashboard/employees" element={<EmployeesList />} />
      <Route path="/dashboard/employees/:id/edit" element={<EmployeeEdit />} />

      {/* Users Dashboard (Admin) */}
      <Route path="/dashboard/users" element={<UsersList />} />
      <Route path="/dashboard/users/:id/edit" element={<UserEdit />} />
    </Routes>
  );
}
