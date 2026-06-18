import { createContext } from "react";

// Definição do tipo do contexto de busca
export type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(undefined);