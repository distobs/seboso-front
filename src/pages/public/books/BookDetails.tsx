import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Hash, FileText, User, Bookmark, Layers, Languages, ShieldAlert } from "lucide-react";
import { getBookById } from "../../../services/book.service";
import type { Book } from "../../../types/book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookData() {
      if (!bookId) return;
      try {
        setLoading(true);
        const data = await getBookById(bookId);
        setBook(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do livro:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBookData();
  }, [bookId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-6 max-w-4xl">
        <div className="h-6 bg-gray-200 rounded-xl w-16" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 h-96 bg-gray-200 rounded-2xl" />
          <div className="flex-1 space-y-4 py-2">
            <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
            <div className="h-5 bg-gray-200 rounded-xl w-1/2" />
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-gray-100 rounded-xl w-full" />
              <div className="h-4 bg-gray-100 rounded-xl w-full" />
              <div className="h-4 bg-gray-100 rounded-xl w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-6 text-center max-w-xl mx-auto space-y-4">
        <p className="text-gray-500 font-medium">Livro não encontrado ou inexistente.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-[#C37351] font-bold hover:underline cursor-pointer"
        >
          Voltar para a listagem
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 max-w-5xl">
      {/* Botão Voltar */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:text-gray-900 hover:border-gray-300 shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>

      {/* Cartão de Detalhes Principal */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Lado Esquerdo: Imagem da Capa ou Placeholder */}
          <div className="w-full md:w-56 shrink-0">
            {book.cover_url ? (
              <div className="w-full aspect-3/4 md:h-80 border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                <img
                  src={book.cover_url}
                  alt={`Capa de ${book.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300";
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-80 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 text-center shadow-xs">
                <BookOpen size={48} className="text-[#C37351]/40" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                  Capa não disponível
                </span>
              </div>
            )}
          </div>

          {/* Lado Direito: Informações Textuais */}
          <div className="flex-1 space-y-6">
            <div>
              {book.genre && (
                <span className="inline-block bg-orange-50 text-[#C37351] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                  {book.genre}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {book.title}
              </h1>
              <p className="text-lg text-gray-500 mt-1 flex items-center gap-1.5">
                <User size={18} className="text-gray-400" />
                {book.author}
              </p>
            </div>

            {/* Grid de Metadados Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Hash size={18} className="text-[#C37351]" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">ISBN</p>
                  <p className="font-semibold text-gray-800">
                    {book.isbn_13_code || book.isbn_10_code || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-[#C37351]" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Publicação</p>
                  <p className="font-semibold text-gray-800">
                    {book.published_at ? new Date(book.published_at).getFullYear() : "Não informado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações Técnicas Adicionais */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-xs border-t border-gray-100 pt-4">
              {book.publisher && (
                <div className="flex items-start gap-2">
                  <Bookmark size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block">Editora</span>
                    <span className="font-medium text-gray-800">{book.publisher}</span>
                  </div>
                </div>
              )}
              {book.edition && (
                <div className="flex items-start gap-2">
                  <Layers size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block">Edição</span>
                    <span className="font-medium text-gray-800">{book.edition}ª Ed.</span>
                  </div>
                </div>
              )}
              {book.language && (
                <div className="flex items-start gap-2">
                  <Languages size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block">Idioma</span>
                    <span className="font-medium text-gray-800">{book.language}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sinopse / Descrição Geral */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                Sinopse / Descrição do livro
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed text-justify bg-white rounded-lg whitespace-pre-line">
                {book.description || (
                  <span className="italic text-gray-400 flex items-center gap-1.5 mt-1">
                    <ShieldAlert size={14} />
                    Nenhuma descrição detalhada foi cadastrada para este exemplar até o momento.
                  </span>
                )}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}