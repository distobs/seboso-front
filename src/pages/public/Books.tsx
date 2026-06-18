import { useState, useEffect } from "react";
import BookCard from "../../components/ui/BookCard";
import type { Book } from "../../types/book";
import { getBooks } from "../../services/book.service";
import { BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { useSearch } from "../../hooks/useSearch"; // Importa o hook de busca

export default function Books() {
  // CONTEXTO: Consome o termo de busca digitado na Sidebar global
  const { searchTerm } = useSearch();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  // Função isolada para quando o usuário clicar em "Tentar Novamente"
  async function handleRefresh() {
    setLoading(true);
    setError("");
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o acervo de livros neste momento.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchBooks() {
      try {
        const booksData = await getBooks();
        if (isMounted) {
          setBooks(booksData);
        }
      } catch (err) {
        console.error("Erro ao carregar catálogo global:", err);
        if (isMounted) {
          setError("Não foi possível carregar o acervo de livros neste momento.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => {
      isMounted = false; // Cancela a atualização se o componente for desmontado no meio do fetch
    };
  }, []); // O array de dependências vazio garante que a busca ocorra apenas uma vez ao montar o componente

  // FILTRAGEM: Cria uma nova lista de livros filtrada por título ou autor em tempo real
  const filteredBooks = books.filter((bookItem) => {
    const term = searchTerm.toLowerCase();
    return (
      bookItem.title.toLowerCase().includes(term) ||
      (bookItem.author && bookItem.author.toLowerCase().includes(term))
    );
  });

  if (loading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div className="h-80 bg-gray-100 rounded-2xl" />
          <div className="h-80 bg-gray-100 rounded-2xl" />
          <div className="h-80 bg-gray-100 rounded-2xl" />
          <div className="h-80 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-xs">
        <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
        <h2 className="text-lg font-bold text-gray-800">Falha na conexão</h2>
        <p className="text-gray-500 text-xs mt-1 mb-6">{error}</p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <RefreshCw size={14} /> Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 text-[#C37351] rounded-xl">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Catálogo Geral do Sistema
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Todos os títulos cadastrados e indexados na plataforma global
            </p>
          </div>
        </div>
        
        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
          {filteredBooks.length} {filteredBooks.length === 1 ? "título localizado" : "títulos localizados"}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
          <BookOpen className="mx-auto text-gray-300 mb-3" size={32} />
          <h3 className="font-semibold text-gray-800">Nenhum livro registrado</h3>
          <p className="text-gray-400 text-xs mt-1">A base de dados global está vazia ou em manutenção.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
          <BookOpen className="mx-auto text-gray-300 mb-3" size={32} />
          <h3 className="font-semibold text-gray-800">Nenhum resultado</h3>
          <p className="text-gray-400 text-xs mt-1">Nenhum título corresponde aos termos da sua pesquisa.</p>
        </div>
      ) : (
        /* Renderização baseada na lista filtrada */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredBooks.map((bookItem) => (
            <BookCard key={bookItem.id} book={bookItem} />
          ))}
        </div>
      )}
    </div>
  );
}