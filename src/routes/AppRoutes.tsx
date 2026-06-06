import { Routes, Route } from "react-router-dom";
import { useUserLocation } from "../hooks/useUserLocation";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/dashboard/DashboardLayout";

import Home from "../pages/public/Home";
import Books from "../pages/public/Books";
import About from "../pages/public/About";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

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

function DashboardPage({children,location,}: {children: React.ReactNode;location: string;}) {
  return (
    <ProtectedRoute>
      <DashboardLayout location={location}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function AppRoutes() {

  const location = useUserLocation();

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={
          <Layout pageTitle="Sebo" location={location}>
            <Home />
          </Layout>
        }
      />

      <Route path="/books" element={
          <Layout pageTitle="Livros" location={location}>
            <Books />
          </Layout>
        }
      />

      <Route path="/about" element={
          <Layout pageTitle="Sobre" location={location}>
            <About />
          </Layout>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={
          <DashboardPage location={location}>
            <DashboardHome />
          </DashboardPage>
        }
      />

      {/* Livros */}
      <Route path="/dashboard/books" element={
          <DashboardPage location={location}>
            <BooksList />
          </DashboardPage>
        }
      />

      <Route path="/dashboard/books/create" element={
          <DashboardPage location={location}>
            <BookCreate />
          </DashboardPage>
        }
      />

      <Route path="/dashboard/books/:id/edit" element={
          <DashboardPage location={location}>
            <BookEdit />
          </DashboardPage>
        }
      />

      {/* Sebo */}
      <Route path="/dashboard/store" element={
          <DashboardPage location={location}>
            <StoreInfo />
          </DashboardPage>
        }
      />

      <Route path="/dashboard/store/edit" element={
          <DashboardPage location={location}>
            <StoreEdit />
          </DashboardPage>
        }
      />

      {/* Funcionários */}
      <Route path="/dashboard/employees" element={
          <DashboardPage location={location}>
            <EmployeesList />
          </DashboardPage>
        }
      />

      <Route path="/dashboard/employees/:id/edit" element={
          <DashboardPage location={location}>
            <EmployeeEdit />
          </DashboardPage>
        }
      />

      {/* Usuários (Admin) */}
      <Route path="/dashboard/users" element={
          <DashboardPage location={location}>
            <UsersList />
          </DashboardPage>
        }
      />

      <Route path="/dashboard/users/:id/edit" element={
          <DashboardPage location={location}>
            <UserEdit />
          </DashboardPage>
        }
      />
    </Routes>
  );
}