import { Edit3, Trash2, ShieldAlert, Library, Store, AlignLeft } from "lucide-react";
import type { CatalogItem } from "../../types/catalog";

interface CatalogTableProps {
  items: CatalogItem[];
  onEdit: (item: CatalogItem) => void;
  onRemove: (storeId: number, bookId: number) => void;
  showStoreColumn?: boolean;
}

const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
};

export default function CatalogTable({ 
  items, 
  onEdit, 
  onRemove, 
  showStoreColumn = false 
}: CatalogTableProps) {
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
        <div className="bg-gray-50 p-3 rounded-full text-gray-400 mb-3">
          <Library size={28} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Nenhum item no catálogo</h3>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">
          Não há livros vinculados ao estoque deste sebo no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider select-none">
              {showStoreColumn && <th className="px-6 py-4 w-44"><span className="flex items-center gap-1"><Store size={12}/> Sebo</span></th>}
              <th className="px-6 py-4">Livro / Identificação</th>
              <th className="px-6 py-4">Estado / Condição</th>
              <th className="px-6 py-4 w-28">Estoque</th>
              <th className="px-6 py-4 w-36">Preço</th>
              <th className="px-6 py-4 w-24 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {items.map((item) => {
              const rowKey = `${item.store_id}-${item.book_id}`;
              
              return (
                <tr key={rowKey} className="hover:bg-gray-50/40 transition-colors group">
                  
                  {showStoreColumn && (
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200/40 w-fit font-semibold">
                        Loja #{item.store_id}
                      </div>
                    </td>
                  )}

                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center h-9 w-7 bg-amber-50 text-[#C37351] border border-amber-100 rounded-md font-bold text-[10px] shrink-0 mt-0.5 select-none uppercase tracking-wider">
                        ID
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block group-hover:text-[#C37351] transition-colors">
                          Livro ID: #{item.book_id}
                        </span>
                        <span className="text-xs text-gray-400 block mt-0.5 font-mono">
                          Ref: global-registry
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-start gap-1.5 text-xs text-gray-500">
                      <AlignLeft size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 italic" title={item.state}>
                        {item.state || <span className="text-gray-300 not-italic">Sem observações descritas.</span>}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {item.quantity > 0 ? (
                      <span className="font-semibold text-gray-800">
                        {item.quantity} <span className="text-xs text-gray-400 font-normal">un.</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
                        <ShieldAlert size={12} /> Esgotado
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900 text-base">
                      {formatCurrency(item.price)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#C37351] hover:bg-orange-50 rounded-xl border border-transparent hover:border-orange-100 transition-all"
                        title="Atualizar Oferta"
                      >
                        <Edit3 size={17} />
                      </button>
                      <button
                        onClick={() => onRemove(item.store_id, item.book_id)}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all"
                        title="Remover do Sebo"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}