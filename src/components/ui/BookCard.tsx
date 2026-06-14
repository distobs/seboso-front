import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/book";
import { BookOpen, Layers } from "lucide-react";

type Props = {
  book: Book;
  catalogPrice?: number;
  catalogQuantity?: number;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value/100);
};

export default function BookCard({ book, catalogPrice, catalogQuantity }: Props) {
  const navigate = useNavigate();
  const hasCatalogData = catalogPrice !== undefined;

  function handleCardClick() {
    navigate(`/books/${book.id}`);
  }

  return (
    <div 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full text-xs hover:border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#C37351]/50"
    >
      {/* Container da Capa do Livro */}
      <div className="relative w-full aspect-3/4 bg-gray-50 border-b border-gray-50 overflow-hidden flex items-center justify-center shrink-0">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={`Capa de ${book.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300";
            }}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-300 gap-1">
            <BookOpen size={28} strokeWidth={1.5} />
            <span className="text-[10px] text-gray-400">Sem Capa</span>
          </div>
        )}

        {/* Badge do Tipo de Capa */}
        {book.cover_type && (
          <span className="absolute bottom-1.5 left-1.5 bg-black/75 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm text-white">
            {book.cover_type}
          </span>
        )}

        {/* Quantidade no estoque do Sebo */}
        {hasCatalogData && catalogQuantity !== undefined && (
          <span className="absolute top-1.5 right-1.5 bg-white/90 border border-gray-100 text-gray-700 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 text-[10px] shadow-xs">
            <Layers size={10} /> {catalogQuantity} un.
          </span>
        )}
      </div>

      {/* Corpo de Informações */}
      <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
        
        <div className="space-y-0.5 min-w-0">
          <span className="inline-block text-[10px] font-bold text-[#C37351] uppercase tracking-wide truncate max-w-full">
            {book.genre || "Geral"}
          </span>
          
          <h2 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#C37351] transition-colors" title={book.title}>
            {book.title}
          </h2>
          
          <p className="text-gray-600 truncate font-medium">
            {book.author}
          </p>
        </div>

        {/* Rodapé Dinâmico */}
        <div className="pt-2 mt-2 border-t border-gray-50 flex items-center justify-between text-[11px] font-medium min-w-0 gap-2">
          {hasCatalogData ? (
            <>
              <span className="text-gray-400 text-[10px]">Preço no Sebo:</span>
              <span className="text-sm font-black text-[#C37351]">
                {formatCurrency(catalogPrice)}
              </span>
            </>
          ) : (
            <>
              <span className="truncate text-gray-400" title={book.publisher || ""}>
                {book.publisher || "S/ Ed."}
              </span>
              <span className="shrink-0 text-gray-500 font-semibold bg-gray-50 px-1.5 py-0.5 rounded">
                {book.edition ? `${book.edition}ª ed.` : "—"}
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}