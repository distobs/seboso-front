import type { Store } from "../../types/store";
import { MapPin, FileText, Hash } from "lucide-react";

type StoreInfoCardProps = {
  store: Store;
  booksCount?: number;
};

export default function StoreInfoCard({ store, booksCount }: StoreInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-28">
      <div className="border-b border-gray-100 pb-4 mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          {store.name}
        </h1>
        <p className="text-sm font-medium text-gray-400 mt-1 flex items-center gap-1">
          <MapPin size={14} />
          {store.city} - {store.state}
        </p>
      </div>

      <div className="space-y-5 text-sm">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin size={12} /> Endereço
          </p>
          <p className="text-gray-700 font-medium leading-relaxed">
            {store.street}, {store.number}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            {store.city_block}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Hash size={12} /> CEP
          </p>
          <p className="text-gray-700 font-medium font-mono">
            {store.cep}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <FileText size={12} /> CNPJ
          </p>
          <p className="text-gray-700 font-medium font-mono">
            {store.cnpj}
          </p>
        </div>
      </div>

      {booksCount !== undefined && (
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            No acervo
          </p>
          <p className="text-2xl font-black text-[#C37351]">
            {booksCount} {booksCount === 1 ? "livro" : "livros"}
          </p>
        </div>
      )}
    </div>
  );
}