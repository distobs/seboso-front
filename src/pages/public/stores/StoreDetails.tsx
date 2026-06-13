import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getStoreById } from "../../../services/store.service";
import { listCatalogByStore } from "../../../services/book.service";

import type { Store } from "../../../types/store";
import type { CatalogItem } from "../../../types/catalog";

import StoreInfoCard from "../../../components/store/StoreInfoCard";
import CatalogBookCard from "../../../components/store/CatalogBookCard";
import { BookOpen, ArrowLeft, Store as StoreIcon } from "lucide-react";

export default function StoreDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // 🟢 Para o botão voltar funcionar dinamicamente

  const [store, setStore] = useState<Store | null>(null);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const [storeData, catalogData] = await Promise.all([
          getStoreById(Number(id)),
          listCatalogByStore(Number(id)),
        ]);

        setStore(storeData);
        setCatalog(catalogData);
      } catch (error) {
        console.error("Erro ao carregar sebo:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full px-8 py-8 animate-pulse">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          <div className="h-96 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-40 bg-gray-200 rounded-2xl" />
              <div className="h-40 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-2xl border shadow-sm">
        <StoreIcon className="mx-auto text-gray-300 mb-3" size={40} />
        <h2 className="text-xl font-bold text-gray-800">Sebo não encontrado</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-[#C37351] font-semibold underline">
          Voltar para a página anterior
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white pb-16">
      {/* Banner Superior de apoio integrado com o botão Voltar */}
      <div className="bg-[#C37351]/10 border-b border-[#C37351]/5 py-4">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <button
            onClick={() => navigate(-1)} // 🟢 Retorna para onde o usuário estava
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#A85F42] hover:text-[#C37351] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </div>

      {/* 🟢 max-w-full e px-12 fazem com que o layout preencha a tela perfeitamente */}
      <div className="w-full max-w-[100%] px-4 sm:px-6 lg:px-12 mt-6">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
          
          {/* Coluna da Esquerda: Dados do Sebo */}
          <div>
            <StoreInfoCard store={store} booksCount={catalog.length} />
          </div>

          {/* Coluna da Direita: Catálogo Expandido */}
          <div className="space-y-6">
            
            {/* Cabeçalho do Catálogo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-[#C37351] rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Catálogo Disponível</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Explore os acervos e exemplares físicos</p>
                </div>
              </div>
            </div>

            {catalog.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <BookOpen className="mx-auto text-gray-300 mb-3" size={32} />
                <h3 className="font-semibold text-gray-800">Acervo em atualização</h3>
              </div>
            ) : (
              // 🟢 Grid redimensionado para expandir e ocupar 3 ou 4 colunas em telas ultra-wide
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {catalog.map((item) => (
                  <CatalogBookCard key={`${item.store_id}-${item.book_id}`} item={item} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}