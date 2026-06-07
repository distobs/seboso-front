import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: number;
  exp: number;
  is_admin: boolean;
  stores?: UserStore[]; // Adicionado caso venha no JWT
};

export type UserStore = {
  store_id: number;
  role: string;
  user_id: number;
};

export type User = {
  token: string;
  id: number;
  isAdmin: boolean;
  stores: UserStore[];
};

function buildUser(token: string): User {
  const payload = jwtDecode<JwtPayload>(token);

  return {
    token,
    id: payload.sub,
    isAdmin: payload.is_admin,
    stores: payload.stores || [], // Correção: propriedade obrigatória inicializada
  };
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;

  login: (token: string) => Promise<void>;
  logout: () => void;

  isAdmin: boolean;
  isOwner: boolean;
  isEmployee: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
export { buildUser };
