import { useState } from "react";
import type { ReactNode } from "react";
import { SearchContext } from "./SearchContext";

// Provedor de contexto para gerenciar o estado global de busca
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}