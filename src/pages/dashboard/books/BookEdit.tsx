import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BookForm from "../../../components/books/BookForm";

import { getBookById, updateBook } from "../../../services/book.service";
import type { CreateBookInput } from "../../../types/book";

import type { Book } from "../../../types/book";
import { BookOpen } from "lucide-react";

export default function BookEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    async function loadBook() {
      if (!id) {
        return;
      }

      try {
        const data = await getBookById(Number(id));
        setBook(data);
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  //
  async function handleUpdate(data: CreateBookInput) {
    try {
      if (!id) return;

      await updateBook(Number(id), data);
      navigate("/dashboard/books");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      alert("Ocorreu um erro ao tentar salvar as alterações do livro.");
    }
  }

  // Renderizações condicionais para estados de carregamento e erro
  if (loading) {
    return (
      <div className="w-full max-w-full px-4 lg:px-8 space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 bg-gray-200 rounded-lg w-1/4" />
          <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
        </div>
        <div className="h-56 bg-gray-100 rounded-2xl w-full" />
        <div className="h-64 bg-gray-100 rounded-2xl w-full" />
      </div>
    );
  }

  // Se o livro não for encontrado, mostramos uma mensagem amigável e um botão para voltar
  if (!book) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <BookOpen className="mx-auto text-gray-300 mb-3" size={40} />
        <h2 className="text-xl font-bold text-gray-800">
          Livro não encontrado
        </h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          O exemplar que você está tentando editar não foi localizado no
          catálogo.
        </p>
        <button
          onClick={() => navigate("/dashboard/books")}
          className="px-4 py-2 bg-[#C37351] hover:bg-[#A85F42] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          Voltar para listagem
        </button>
      </div>
    );
  }

  return (
    // Container principal com padding e largura máxima para manter o conteúdo centralizado e legível
    <div className="w-full max-w-full px-4 lg:px-8 space-y-6">
      {/* Título e Subtítulo Identificadores */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Editar Livro
        </h1>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Modifique os metadados, identificações e sinopse de{" "}
          <span className="font-bold text-gray-700">{book.title}</span>
        </p>
      </div>

      <BookForm initialData={book} onSubmit={handleUpdate} />
    </div>
  );
}
