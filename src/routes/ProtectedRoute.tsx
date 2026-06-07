import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;

  allowAdmin?: boolean;
  allowOwner?: boolean;
  allowEmployee?: boolean;
};

export default function ProtectedRoute({
  children,
  allowAdmin = false,
  allowOwner = false,
  allowEmployee = false,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isAdmin,
    isOwner,
    isEmployee,
  } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasRole =
    !allowAdmin &&
    !allowOwner &&
    !allowEmployee
      ? true
      : (allowAdmin && isAdmin) ||
        (allowOwner && isOwner) ||
        (allowEmployee && isEmployee);

  if (!hasRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}