import type { CatalogItem } from "../../types/catalog";
import { Bookmark } from "lucide-react";

type CatalogBookCardProps = {
  item: CatalogItem;
};

export default function CatalogBookCard({ item }: CatalogBookCardProps) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px]">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-1.5 text-[#C37351]">
            <Bookmark size={14} />
            <h3 className="font-bold text-gray-900 text-lg">
              Livro #{item.book_id}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {item.description || "Sem descrição informada pelo sebo."}
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-2xl font-black text-[#C37351] tracking-tight">
            R$ {item.price.toFixed(2)}
          </p>
          
          <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#F8ECE6] text-[#A85F42]">
            {item.quantity} un.
          </span>
        </div>
      </div>
    </div>
  );
}