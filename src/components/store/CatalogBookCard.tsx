import type { CatalogItem } from "../../types/catalog";
import { Bookmark, Layers, ShieldAlert } from "lucide-react";

type CatalogBookCardProps = {
  item: CatalogItem;
};

// Função utilitária para formatar os centavos em Moeda Real (R$)
const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
};

export default function CatalogBookCard({ item }: CatalogBookCardProps) {
  const isOutOfStock = item.quantity <= 0;

  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-40 group">
      <div className="flex justify-between items-start gap-4">
        
        {/* Lado Esquerdo: Identificação e Estado do Livro */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-1.5 text-[#C37351]">
            <Bookmark size={15} className="group-hover:fill-[#C37351] transition-all" />
            <h3 className="font-bold text-gray-900 text-base tracking-tight">
              Livro ID: #{item.book_id}
            </h3>
          </div>
          
          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed italic">
            {item.state ? `"${item.state}"` : "Sem observações sobre o estado do exemplar."}
          </p>
        </div>

        {/* Lado Direito: Preço Comercial e Estoque */}
        <div className="text-right shrink-0 flex flex-col items-end">
          <p className="text-xl font-black text-gray-900 tracking-tight group-hover:text-[#C37351] transition-colors">
            {formatCurrency(item.price)}
          </p>
          
          {/* Badge dinâmica de quantidade de estoque */}
          {!isOutOfStock ? (
            <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#F8ECE6] text-[#A85F42] border border-[#f0ded5]">
              <Layers size={11} /> {item.quantity} un.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-rose-50 text-rose-700 border border-rose-100Este item está indisponível">
              <ShieldAlert size={11} /> Esgotado
            </span>
          )}
        </div>

      </div>
    </div>
  );
}