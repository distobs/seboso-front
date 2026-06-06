// AuthContext.ts
import { createContext } from "react";

export type User = {
  token: string;
  role?: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
