import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { getBooks, deleteBook } from "../../../services/book.service";
import type { Book } from "../../../types/book";

import BooksTable from "../../../components/books/BooksTable";
import { Plus, BookOpen, AlertTriangle } from "lucide-react";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado e referência para o Modal de Exclusão Centrado
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  // Abre o modal de exclusão setando o id selecionado
  function confirmDelete(id: number) {
    setBookToDelete(id);
    deleteModalRef.current?.showModal();
  }

  // Fecha o modal limpando o estado temporário
  function closeModal() {
    deleteModalRef.current?.close();
    setBookToDelete(null);
  }

  // Executa a deleção reativa real
  async function handleDelete() {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookToDelete),
      );
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    } finally {
      closeModal();
    }
  }

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      try {
        const data = await getBooks();
        if (active) {
          setBooks(data);
        }
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
    };
  }, []);

  // Skeleton Loading estruturado em formato de tabela
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2 w-1/4">
            <div className="h-7 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-32" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="h-12 bg-gray-50 border-b border-gray-100" />
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-5 flex items-center justify-between border-b border-gray-50"
            >
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-9 h-12 bg-gray-200 rounded-md shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-8 bg-gray-200 rounded-lg w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Gerenciar Livros
          </h1>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            {books.length}{" "}
            {books.length === 1
              ? "exemplar registrado"
              : "exemplares registrados"}{" "}
            no catálogo total
          </p>
        </div>

        <Link
          to="/dashboard/books/create"
          className="flex items-center gap-2 bg-[#C37351] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          Novo Livro
        </Link>
      </div>

      {/* Tabela ou Empty State */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {books.length === 0 ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center max-w-sm mx-auto">
            <div className="p-4 bg-gray-50 rounded-2xl text-gray-300 mb-4 border border-gray-100">
              <BookOpen size={32} />
            </div>
            <p className="font-bold text-gray-800 text-lg">Catálogo vazio</p>
            <p className="text-sm text-gray-400 mt-1 mb-6 leading-relaxed">
              Nenhum livro foi cadastrado no acervo deste sistema até o momento.
            </p>
            <Link
              to="/dashboard/books/create"
              className="inline-flex items-center gap-2 bg-orange-50 text-[#A85F42] px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors"
            >
              <Plus size={14} strokeWidth={2.5} /> Adicionar primeiro livro
            </Link>
          </div>
        ) : (
          /* O seu manipulador agora repassa a chamada para abrir o modal */
          <BooksTable books={books} onDelete={confirmDelete} />
        )}
      </div>

      {/* Modal Customizado de Confirmação Centrado Absoluto */}
      <dialog
        ref={deleteModalRef}
        onClose={closeModal}
        className="fixed inset-0 m-auto backdrop:bg-black/40 rounded-2xl border border-gray-100 p-6 shadow-xl max-w-sm w-full bg-white focus-visible:outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl mb-4 border border-red-100">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-lg font-bold text-gray-900">
            Remover do Catálogo?
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Esta ação removerá permanentemente o livro selecionado das buscas
            integradas e registros associados.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-red-100"
            >
              Sim, Excluir
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
