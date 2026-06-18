import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSearch } from "../../hooks/useSearch"; // 1. Importe o hook de busca

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
  location: string;
};

export default function Layout({ children, pageTitle, location }: LayoutProps) {
  //Consome o estado global de busca do contexto
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
        
      <Header location={location} />
      
      <div className="flex">

        {/*Passa os dados obrigatórios para a Sidebar */}
        <Sidebar 
          pageTitle={pageTitle} 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}