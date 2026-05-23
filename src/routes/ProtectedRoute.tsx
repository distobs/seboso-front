import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({children,allowedRoles,}: ProtectedRouteProps) {

  const {isAuthenticated,user,loading} = useAuth();

  // Espera autenticação carregar
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Usuário não autenticado
  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (allowedRoles && (user?.role || !allowedRoles.includes(user.role))) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}