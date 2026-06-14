import { useState, type FormEvent } from "react";
import { Save, Layers, AlignLeft, Hash } from "lucide-react"; 
import type { CatalogItem, AddToCatalogInput, UpdateCatalogInput } from "../../types/catalog";

interface CatalogFormProps {
  storeId: number;
  initialData?: CatalogItem;
  onSubmit: (data: AddToCatalogInput | UpdateCatalogInput) => Promise<void>;
  submitting: boolean;
}

export default function CatalogForm({ storeId, initialData, onSubmit, submitting }: CatalogFormProps) {
  const isEditing = !!initialData;

  const [bookId, setBookId] = useState(initialData?.book_id ? String(initialData.book_id) : "");
  const [quantity, setQuantity] = useState(initialData?.quantity ? String(initialData.quantity) : "1");

  const [state, setState] = useState(initialData?.state || "");
  
  const [price, setPrice] = useState(
    initialData?.price ? (initialData.price / 100).toFixed(2) : ""
  );

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const priceInCents = Math.round(parseFloat(price.replace(",", ".")) * 100);

    if (isEditing) {
      // Envia o payload no contrato exato do PUT /catalog
      const payload: UpdateCatalogInput = {
        store_id: storeId,
        book_id: Number(bookId),
        price: priceInCents,
        quantity: Number(quantity),
        state: state.trim(),
      };
      await onSubmit(payload);
    } else {
      // Envia o payload no contrato exato do POST /catalog
      const payload: AddToCatalogInput = {
        store_id: storeId,
        book_id: Number(bookId),
        price: priceInCents,
        quantity: Number(quantity),
        state: state.trim(),
      };
      await onSubmit(payload);
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-5">
        
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">
            {isEditing ? "Atualizar Oferta no Sebo" : "Vincular Livro ao Estoque"}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Defina o preço, a quantidade e o estado do exemplar físico disponível na sua loja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* ID do Livro */}
          <div className="space-y-1 md:col-span-1">
            <label className="text-xs font-bold text-gray-600 uppercase">ID do Livro Global</label>
            <div className="relative">
              <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                required
                disabled={isEditing}
                placeholder="Ex: 42"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200/60"
              />
            </div>
          </div>

          {/* Preço de Venda */}
          <div className="space-y-1 md:col-span-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Preço de Venda</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 select-none">R$</span>
              <input
                type="text"
                required
                placeholder="0,00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>

          {/* Quantidade */}
          <div className="space-y-1 md:col-span-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Quantidade</label>
            <div className="relative">
              <Layers size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                required
                min="0"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all"
              />
            </div>
          </div>

          {/* Campo de Texto rotulado e conectado à propriedade 'state' */}
          <div className="space-y-1 md:col-span-3">
            <label className="text-xs font-bold text-gray-600 uppercase">Estado de Conservação do Livro</label>
            <div className="relative">
              <AlignLeft size={16} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                rows={3}
                required
                placeholder="Descreva o estado do livro (Ex: Usado - Excelente estado, páginas amareladas, sem grifos ou assinaturas)."
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all resize-none"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#C37351] text-white px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-[#A85F42] active:scale-[0.99] disabled:bg-gray-200 disabled:text-gray-400 disabled:pointer-events-none transition-all shadow-xs"
        >
          <Save size={16} />
          {submitting ? "Salvando Oferta..." : isEditing ? "Salvar Alterações" : "Adicionar ao Catálogo"}
        </button>
      </div>
    </form>
  );
}