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

import StoreCatalog from "../pages/dashboard/store/StoreCatalog";
import StoreInfo from "../pages/dashboard/store/StoreInfo";
import StoreEdit from "../pages/dashboard/store/StoreEdit";

import EmployeesList from "../pages/dashboard/employees/EmployeesList";
import EmployeeEdit from "../pages/dashboard/employees/EmployeeEdit";

import UsersList from "../pages/dashboard/users/UsersList";
import UserEdit from "../pages/dashboard/users/UserEdit";

// Componente para páginas do dashboard, que precisam de autenticação e layout específico
function DashboardPage({
  children,
  location,
  allowAdmin,
  allowOwner,
  allowEmployee,
}: {
  children: React.ReactNode;
  location: string;

  allowAdmin?: boolean;
  allowOwner?: boolean;
  allowEmployee?: boolean;
}) {
  return (
    <ProtectedRoute
      allowAdmin={allowAdmin}
      allowOwner={allowOwner}
      allowEmployee={allowEmployee}
    >
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
      
      {/* PÚBLICO: Página inicial que lista os sebos parceiros da plataforma */}
      <Route path="/" element={
          <Layout pageTitle="Sebo" location={location}>
            <Home />
          </Layout>
        }
      />

      {/* PÚBLICO: Catálogo geral e aberto de livros cadastrados no sistema */}
      <Route path="/books" element={
          <Layout pageTitle="Livros" location={location}>
            <Books />
          </Layout>
        }
      />

      {/* PÚBLICO: Página institucional com informações sobre a plataforma */}
      <Route path="/about" element={
          <Layout pageTitle="Sobre" location={location}>
            <About />
          </Layout>
        }
      />
      
      {/* AUTENTICAÇÃO: Tela de login para usuários e gestores */}
      <Route path="/login" element={<Login />} />
      
      {/* AUTENTICAÇÃO: Tela de cadastro de novos usuários */}
      <Route path="/signup" element={<Signup />} />

      
      {/* DASHBOARD: Página inicial do painel (visão geral customizada por usuário) */}
      <Route path="/dashboard" element={
          <DashboardPage location={location}>
            <DashboardHome />
          </DashboardPage>
        }
      />
      
      {/* ADMIN GLOBAL: Lista de controle com todos os livros do banco de dados */}
      <Route path="/dashboard/books" element={
          <DashboardPage location={location} allowAdmin>
            <BooksList />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner/Employee): Formulário para registrar um novo livro na base de dados global */}
      <Route path="/dashboard/books/create" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <BookCreate />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner/Employee): Tela para editar os metadados de um livro específico */}
      <Route path="/dashboard/books/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <BookEdit />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner/Employee): Gerencia o acervo local e estoque de um sebo específico */}
      <Route path="/dashboard/stores/:id/catalog" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <StoreCatalog />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner): Lista e gerencia a equipe de funcionários contratados de um sebo */}
      <Route path="/dashboard/stores/:id/employees" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <EmployeesList />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner/Employee): Edita os dados cadastrais (endereço, telefone) do sebo contextualizado */}
      <Route path="/dashboard/stores/:id/settings" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <StoreEdit />
          </DashboardPage>
        }
      />

      {/* ADMIN GLOBAL: Lista mestre com todos os sebos integrados na plataforma */}
      <Route path="/dashboard/stores" element={
          <DashboardPage location={location} allowAdmin>
            <StoreInfo /> 
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner/Employee): Exibe informações detalhadas e perfil interno de um sebo específico */}
      <Route path="/dashboard/stores/:id" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <StoreInfo />
          </DashboardPage>
        }
      />

      {/* RESTRITO (Admin/Owner): Rota alternativa direta para editar dados do sebo por ID */}
      <Route path="/dashboard/stores/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <StoreEdit />
          </DashboardPage>
        }
      />
      
      {/* RESTRITO (Admin/Owner): Formulário estruturado para atualizar os dados de um funcionário de um sebo */}
      <Route path="/dashboard/stores/:storeId/employees/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <EmployeeEdit />
          </DashboardPage>
        }
      />

      {/* FALLBACK (Admin/Owner): Rota antiga genérica para listar funcionários (mantida por segurança) */}
      <Route path="/dashboard/employees" element={
          <DashboardPage location={location} allowAdmin allowOwner >
            <EmployeesList />
          </DashboardPage>
        }
      />

      {/* FALLBACK (Admin/Owner): Rota antiga genérica para editar funcionários por ID básico */}
      <Route path="/dashboard/employees/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <EmployeeEdit />
          </DashboardPage>
        }
      />

      {/* ADMIN GLOBAL: Painel de controle e listagem de todos os usuários cadastrados no sistema */}
      <Route path="/dashboard/users" element={
          <DashboardPage location={location} allowAdmin>
            <UsersList />
          </DashboardPage>
        }
      />

      {/* ADMIN GLOBAL: Tela para gerenciar permissões e dados cadastrais de qualquer usuário */}
      <Route path="/dashboard/users/:id/edit" element={
          <DashboardPage location={location} allowAdmin>
            <UserEdit />
          </DashboardPage>
        }
      />
    </Routes>
  );
}