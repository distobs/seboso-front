import { useContext } from "react"; // Importa a função useContext do React para acessar o contexto de autenticação criado no AuthContext
import { AuthContext } from "../contexts/AuthContext"; // Importa o contexto de autenticação para acessar as informações do usuário e as funções de login e logout

// Hook personalizado para acessar o contexto de autenticação
export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {
  
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}