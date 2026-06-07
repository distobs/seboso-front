import { useState, useEffect} from "react";
import { AuthContext, buildUser } from "./AuthContext";
import { getUserStores } from "../services/userstore.service";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                return buildUser(token); 
            } catch {
                localStorage.removeItem("token"); 
                return null;
            }
        }
    }
    return null;
    });

    async function login(token: string) {
        localStorage.setItem("token", token);
        const baseUser = buildUser(token);
        const stores =
            await loadUserStores(baseUser.id);
        setUser({
            ...baseUser,
            stores,
        });
    }

    async function loadUserStores(userId: number) {
        try {
            return await getUserStores(userId);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    
    useEffect(() => {
        async function restoreStores() {
            if (!user) return;
            if (user.stores.length > 0) return
            
            const stores = await loadUserStores(user.id);

            setUser((current) => {
                if (!current) return null;
                return {
                    ...current,
                    stores,
                };
            });
        }

            restoreStores();
    }, [user]);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  function isAdmin() {
    return user?.isAdmin ?? false;
  }

  function isOwner() {
    return user?.stores.some((store) => store.role === "owner") ?? false;
  }

  function isEmployee() {
    return user?.stores.some((store) => store.role === "employee") ?? false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,

        login,
        logout,

        isAdmin: isAdmin(),
        isOwner: isOwner(),
        isEmployee: isEmployee(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
