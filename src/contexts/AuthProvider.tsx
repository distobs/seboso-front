// AuthProvider.tsx
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? { token } : null;
    }
    return null;
  });

  function login(token: string) {
    localStorage.setItem("token", token);
    setUser({ token });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
