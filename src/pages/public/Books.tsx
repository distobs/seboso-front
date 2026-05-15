import { useState, useEffect} from "react"; // Importa os hooks useState e useEffect do React para gerenciar o estado dos livros e realizar a busca na API quando o componente for montado
import BookCard from "../../components/ui/BookCard"; // Importa o componente BookCard para exibir as informações de cada livro na lista
import type { Book } from "../../types/book"; // Importa o tipo Book para tipar o estado dos livros e as props do componente BookCard
import { getBooks } from "../../services/book.service"; // Importa a função getBooks para buscar os livros na API

export default function Books() {

  const [books, setBooks] = useState<Book[]>([]); // Estado para armazenar a lista de livros
  const [loading, setLoading] = useState(true); // Estado para controlar o loading
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro

  useEffect(() => {

    async function fetchBooks() {
      setLoading(true);
      setError("");

      try {
        const booksData = await getBooks();
        console.log("Livros carregados:", booksData);
        setBooks(booksData);
      } catch {
        setError("Erro ao buscar livros.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Catálogo Geral
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
      ">
        {books.map((books) => (
          <BookCard
            key={books.id}
            book={books}
          />
        ))}
      </div>
    </>
  );
}